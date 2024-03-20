import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Post } from "~/server/db/types";
import { posts } from "~/server/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // get all posts
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findMany();
  }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst({ 
      // orderBy: [desc(posts.createdAt)] ,
    });
  }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.db.insert(posts).values({
        name: input.name,
      });
      return post;
    }),

  /*
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const post: Post = await ctx.db.insert(posts).values({
        name: input.name,
      }) as Post;
      return post;
    }),

    
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.posts.findFirst();
  }),
  */
});
