export async function readJsonRequest(request: Request): Promise<{ok:true; value:unknown}|{ok:false}> {
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return {ok:false};
  try {
    return {ok:true, value: await request.json()};
  } catch {
    return {ok:false};
  }
}
