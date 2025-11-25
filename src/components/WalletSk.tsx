import React from "react";
import { Button } from "./ui/button";

export default function WalletSk({ address }: { address: string }) {
  return (
    <div className=" h-[125px] flex justify-start items-start border-2 border-dashed border-gray-300 rounded-lg mt-3">
      <div className="flex flex-col items-start">
        <div className="text-2xl font-semibold m-3">Wallet</div>
        <div className="text-lg m-3">Address : {address}</div>
      </div>
    </div>
  );
}
