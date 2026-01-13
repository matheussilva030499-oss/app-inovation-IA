import { db } from "./db";
import {
  users, tickets, messages,
  type User, type InsertUser,
  type Ticket, type InsertTicket, type UpdateTicketRequest,
  type Message, type InsertMessage,
  type TicketsQueryParams
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Tickets
  getTickets(params?: TicketsQueryParams): Promise<Ticket[]>;
  getTicket(id: number): Promise<Ticket | undefined>;
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  updateTicket(id: number, updates: UpdateTicketRequest): Promise<Ticket>;

  // Messages
  getMessages(ticketId: number): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Tickets
  async getTickets(params?: TicketsQueryParams): Promise<Ticket[]> {
    let query = db.select().from(tickets);
    
    if (params) {
      const conditions = [];
      if (params.status) conditions.push(eq(tickets.status, params.status));
      if (params.priority) conditions.push(eq(tickets.priority, params.priority));
      if (params.assignedToId) conditions.push(eq(tickets.assignedToId, params.assignedToId));
      if (params.customerId) conditions.push(eq(tickets.customerId, params.customerId));
      
      if (conditions.length > 0) {
        // @ts-ignore
        query = query.where(and(...conditions));
      }
    }
    
    return await query.orderBy(desc(tickets.createdAt));
  }

  async getTicket(id: number): Promise<Ticket | undefined> {
    const [ticket] = await db.select().from(tickets).where(eq(tickets.id, id));
    return ticket;
  }

  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    const [newTicket] = await db.insert(tickets).values(ticket).returning();
    return newTicket;
  }

  async updateTicket(id: number, updates: UpdateTicketRequest): Promise<Ticket> {
    const [updatedTicket] = await db
      .update(tickets)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(tickets.id, id))
      .returning();
    return updatedTicket;
  }

  // Messages
  async getMessages(ticketId: number): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.ticketId, ticketId))
      .orderBy(messages.createdAt);
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }
}

export const storage = new DatabaseStorage();
