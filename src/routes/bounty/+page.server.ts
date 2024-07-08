import { DefaultProvider, bsv } from 'scrypt-ts';
import { Root } from '$lib/contracts/root';
import { NeucronSigner } from 'neucron-signer';

const provider = new DefaultProvider({ network: bsv.Networks.mainnet });
const signer = new NeucronSigner(provider);
let instance: Root | null = null;

/** @type {import('./$types').Actions} */
export const actions = {
  deploy: async ({ request }) => {
    const data = await request.formData();
    
    await signer.login('sales@timechainlabs.io', 'string');
    await Root.loadArtifact();
    
    const square = BigInt(data.get('square') as string);
    instance = new Root(square);
    
    await instance.connect(signer);
    const deployTx = await instance.deploy(Number(BigInt(data.get('amount') as string)));
    
    console.log('smart lock deployed: https://whatsonchain.com/tx/' + deployTx.id);
    
    return { success: true, tx: deployTx.id };
  },
  unlock: async ({ request }) => {
    if (!instance) {
      console.error('Instance not initialized');
      return { success: false, error: 'Instance not initialized' };
    }
    
    const data = await request.formData();
    const root = data.get('root');
    
    const { tx: callTx } = await instance.methods.unlock(BigInt(root as string));
    console.log('contract unlocked successfully: https://whatsonchain.com/tx/' + callTx.id);
    
    return { success: true, tx: callTx.id };
  }
};
