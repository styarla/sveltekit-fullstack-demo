<script lang="ts">
    import { PrivateKey } from '@bsv/sdk'

    let WIF:string
    let address:string

    function createKeys() {
        const privKey = PrivateKey.fromRandom()
        WIF = privKey.toWif()
        console.log("Private Key IF format is ", WIF)
        address = privKey.toAddress()
        console.log("Your bitcoin address is ",address)

    }
</script>


<section>
    <button on:click={createKeys}> Generate New Wallet Keys</button>
    <p class="mt-4">Private Key WIF format is {WIF}</p>
    <p class="mt-4">Your Bitcoin Address is {address}</p>
</section>