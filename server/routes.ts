import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

// Helper to seed initial data
async function seedDatabase() {
  const existingUsers = await storage.getUserByUsername("admin");
  if (!existingUsers) {
    // Create admin/agent
    const admin = await storage.createUser({
      username: "admin",
      email: "admin@servicedesk.com",
      role: "admin"
    });
    
    // Create some tickets
    await storage.createTicket({
      title: "Problema com impressora",
      description: "A impressora do 3º andar não está conectando na rede.",
      status: "open",
      priority: "medium",
      customerId: admin.id,
    });
    
    await storage.createTicket({
      title: "Erro no Login",
      description: "Não consigo acessar o sistema de ERP.",
      status: "high",
      priority: "high",
      customerId: admin.id,
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Initialize seed data
  seedDatabase().catch(console.error);

  // Tickets
  app.get(api.tickets.list.path, async (req, res) => {
    const input = api.tickets.list.input?.parse(req.query);
    const tickets = await storage.getTickets(input);
    res.json(tickets);
  });

  app.get(api.tickets.get.path, async (req, res) => {
    const ticket = await storage.getTicket(Number(req.params.id));
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  });

  app.post(api.tickets.create.path, async (req, res) => {
    try {
      const input = api.tickets.create.input.parse(req.body);
      const ticket = await storage.createTicket(input);
      res.status(201).json(ticket);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.patch(api.tickets.update.path, async (req, res) => {
    try {
      const input = api.tickets.update.input.parse(req.body);
      const ticket = await storage.updateTicket(Number(req.params.id), input);
      res.json(ticket);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Messages
  app.get(api.messages.list.path, async (req, res) => {
    const messages = await storage.getMessages(Number(req.params.ticketId));
    res.json(messages);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const ticketId = Number(req.params.ticketId);
      const message = await storage.createMessage({ ...input, ticketId });
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // User
  app.get(api.users.me.path, async (req, res) => {
    // In a real app, this would get the user from session
    // For now, let's mock or return the first user if available
    const user = await storage.getUserByUsername("admin");
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(user);
  });

  // AI Analysis Mock (Place holder for actual OpenAI call)
  app.post(api.tickets.analyze.path, async (req, res) => {
    // Here we would call OpenAI
    res.json({
      summary: "User is reporting connectivity issues with hardware.",
      suggestion: "Check network cables and IP configuration."
    });
  });

  return httpServer;
}
