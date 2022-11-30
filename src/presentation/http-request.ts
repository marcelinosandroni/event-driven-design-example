export interface HttpRequest<Params = Record<string, unknown>, Body = unknown> {
  params: Params;
  body: Body;
}
