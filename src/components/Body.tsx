import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { generateMnemonic } from "bip39";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { Dialog, DialogContent } from "./ui/dialog";
import SolanaWallet from "./SolanaWallet";

export default function Body() {
  const [mnemonic, setMnemonic] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [firstWalletCreated, setFirstWalletCreated] = useState(false);
  const [walletButtonVisible, setWalletButtonVisible] = useState(true);

  function handleGenerate() {
    const mn = generateMnemonic();
    setMnemonic(mn);
    toast("Wallet has been generated successfully!");
    setIsDialogOpen(true);
  }

  function handleCopy() {
    if (!mnemonic) return;
    navigator.clipboard
      .writeText(mnemonic)
      .then(() => toast("Mnemonic copied!"))
      .catch(() => toast.error("Failed to copy"));
  }

  function handleDialogClose() {
    setIsDialogOpen(false);
    setFirstWalletCreated(true);
    setWalletButtonVisible(false);
  }

  return (
    <div className=" min-h-[75vh]">
      <div className="flex justify-between items-center">
        {walletButtonVisible ? (
          <>
            <div className="flex flex-col justify-center items-start m-4 gap-2">
              <div className="text-4xl font-extrabold">
                Recovery Secret Phrase
              </div>
              <div>
                Keep this <span className="font-bold ">hidden</span> and safe
              </div>
            </div>
            <Button variant="default" className="m-4" onClick={handleGenerate}>
              Generate Wallet
            </Button>
          </>
        ) : (
          <>
            {firstWalletCreated && (
              <div className="flex flex-col justify-center  w-full items-center mt-10">
                <div className="text-lg mb-4 w-full ">
                  <SolanaWallet mnemonic={mnemonic} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {mnemonic && (
            <div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                {mnemonic.split(" ").map((wordlists, idx) => (
                  <Input
                    readOnly
                    value={wordlists}
                    key={idx}
                    className="text-center font-medium px-2 py-2 "
                  ></Input>
                ))}
              </div>
              <Button variant="outline" onClick={handleCopy} className="mt-4 ">
                Click to Copy
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => handleDialogClose()}
              >
                Get Started{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 6l6 6l-6 6" />
                </svg>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
