import { DefaultProvider, bsv } from 'scrypt-ts';
import { Root } from '$lib/contracts/root';
import { NeucronSigner } from 'neucron-signer';

const provider = new DefaultProvider({ network: bsv.Networks.mainnet });
//const signer = new NeucronSigner(provider)
//let instance

export const actions = {
  deploy: async ({ request }) => {
    const data = await request.formData();
    
    // Uncomment and modify the following lines as needed
    // await signer.login('sales@timechainlabs.io', 'string');
    // await Root.loadArtifact();
    // const square = BigInt(data.get('square'));
    // const instance = new Root(square);
    // await instance.connect(signer);
    // const deployTx = await instance.deploy(data.get('amount'));

    const deployTx = { id: 'asdf' };
    console.log('smart lock deployed: https://whatsonchain.com/tx/' + deployTx.id);

    return { success: true, tx: deployTx.id };
  },
  unlock: async ({ request }) => {
    const data = await request.formData();
    const root = data.get('root');
    
    // Uncomment and modify the following lines as needed
    // await new Promise((f) => setTimeout(f, 5000));
    const { tx: callTx } = await instance.methods.unlock(root);
    console.log('contract unlocked successfully: https://whatsonchain.com/tx/' + callTx.id);

    const tx = 'txid';
    return { success: true, tx };
  }
};
