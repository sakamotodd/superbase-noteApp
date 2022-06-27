// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  revalidated: boolean;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log('Revalidataing details page...');
  const {
    query: { id },
  } = req;
  let revalidated = false;
  try {
    await res.unstable_revalidate(`note/${id}`);
  } catch (error) {
    alert(error);
  }
  res.json({
    revalidated,
  });
}
