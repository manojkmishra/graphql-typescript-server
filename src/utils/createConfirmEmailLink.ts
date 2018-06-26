import { v4 } from "uuid";
import { Redis } from "ioredis";
// http://localhost:4000
// https://my-site.com
// => https://my-site.com/confirm/<id>
export const createConfirmEmailLink = async (
  url: string,
  userId: string,
  redis: Redis
) => { console.log('inside redis url',url)
  const id = v4();
  // return `http:\\localhost:2323`;
  await redis.set(id, userId, "ex", 60 * 60 * 24);
 // return `http:\\localhost:2325555553`;
  return `${url}/confirm/${id}`;
};