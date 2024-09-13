export const RatingsRouter = createTRPCRouter({
  getByOfferId: GetProcedure,
  delete: DeleteProcedure,
  create: CreateProcedure,
});
