import { z } from 'zod';
import { insertTicketSchema, insertMessageSchema, tickets, messages, users } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  tickets: {
    list: {
      method: 'GET' as const,
      path: '/api/tickets',
      input: z.object({
        status: z.string().optional(),
        priority: z.string().optional(),
        assignedToId: z.coerce.number().optional(),
        customerId: z.coerce.number().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof tickets.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/tickets/:id',
      responses: {
        200: z.custom<typeof tickets.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tickets',
      input: insertTicketSchema,
      responses: {
        201: z.custom<typeof tickets.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/tickets/:id',
      input: insertTicketSchema.partial(),
      responses: {
        200: z.custom<typeof tickets.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
    analyze: {
      method: 'POST' as const,
      path: '/api/tickets/:id/analyze',
      responses: {
        200: z.object({
          summary: z.string(),
          suggestion: z.string(),
        }),
        404: errorSchemas.notFound,
      },
    }
  },
  messages: {
    list: {
      method: 'GET' as const,
      path: '/api/tickets/:ticketId/messages',
      responses: {
        200: z.array(z.custom<typeof messages.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tickets/:ticketId/messages',
      input: insertMessageSchema.omit({ ticketId: true }),
      responses: {
        201: z.custom<typeof messages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  users: {
    me: {
      method: 'GET' as const,
      path: '/api/user',
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: z.object({ message: z.string() }),
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
