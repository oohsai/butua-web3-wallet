import React, { useEffect } from "react";
import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Button } from "./ui/button";
import WalletSk from "./WalletSk";
import { toast } from "sonner";

export default function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);
  async function addToWallet({ mnemonic }: { mnemonic: string }) {
    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keyPair = Keypair.fromSecretKey(secret);
    setCurentIndex(currentIndex + 1);
    setPublicKeys([...publicKeys, keyPair.publicKey.toBase58()]);
    toast("Wallet has been added successfully!");
  }

  function clearWallet() {
    setPublicKeys([]);
    setCurentIndex(0);
    toast("All Wallet has been removed successfully!");
  }

  useEffect(() => {
    addToWallet({ mnemonic });
  }, []);

  return (
    <div className="">
      {publicKeys.length === 0 ? (
        <div className="text-lg font-medium mt-4">No Wallets Added</div>
      ) : (
        <div className="">
          <div className=" flex items-center justify-end mr-auto gap-2">
            <Button onClick={() => addToWallet({ mnemonic })}>
              Add to Wallet
            </Button>
            <Button
              variant="destructive"
              className=""
              onClick={() => clearWallet()}
            >
              Remove all Wallets
            </Button>
          </div>

          {publicKeys.map((key) => (
            <WalletSk address={key} />
          ))}
        </div>
      )}
    </div>
  );
}
