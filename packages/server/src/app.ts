import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import * as ethers from 'ethers';
import { HttpRpcClient } from '@account-abstraction/sdk/dist/src/HttpRpcClient';

// load environment variables before loading middlewares, and controllers.
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  dotenv.config();
}

// eslint-disable-next-line jsdoc/require-jsdoc
async function getHttpRpcClient(
  provider: ethers.providers.JsonRpcProvider,
  bundlerUrl: string,
  entryPointAddress: string,
) {
  const chainId = await provider.getNetwork().then((net) => net.chainId);
  return new HttpRpcClient(bundlerUrl, entryPointAddress, chainId);
}

const app: express.Express = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post('/aa', async (req, res) => {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.RPC_ENDPOINT,
  );
  const client = await getHttpRpcClient(
    provider,
    process.env.BUNDLER_URL as string,
    process.env.ENTRY_POINT_ADDRESS as string,
  );

  try {
    const uoHash = await client.sendUserOpToBundler(JSON.parse(req.body.op));
    return res.json({
      uoHash,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).send();
  }
});

export default app;
