"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { Select } from "@repo/ui/Select";
import { useState } from "react";
import { TextInput } from "@repo/ui/TextInput";
import { createOnRampTransaction } from "../app/lib/actions/createOnRamptxn";

const SUPPORTED_BANK = [{
    name: "HDFC Bank",
    redirectUrl: "https://www.hdfcbank.com/"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANK[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANK[0]?.name || "");

    return <Card title = "Add Money" className="max-w-md w-full">
        <div className="w-full">
            <TextInput label={"Amount"} placeholder={"Amount"} onChange={(value) => {
                setAmount(value)
            }}/>
            <div className="py-4 text-left">
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANK.find(x => x.name === value)?.redirectUrl || "")
                setProvider(SUPPORTED_BANK.find(x => x.name === value)?.name || "")
            }} options = {SUPPORTED_BANK.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="pt-4 px-4 flex justify-center">
               <Button className="px-6 py-2 bg-black text-white rounded"onClick={async() => {
                   await createOnRampTransaction(amount * 100, provider)
                   window.location.href = redirectUrl || ""
                }}>
                Add Money
               </Button>
            </div>
        </div>
    </Card>
}