import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const RecomendedAccounts = (accounts) => {
  return (
    <aside>
      <Card>
        <CardHeader>
          <h2>Recomended Accounts</h2>
        </CardHeader>
        <CardContent>
          {accounts.map((account) => (
            <Avatar>
              <AvatarImage src={account.profilePic} alt={account.name} />
              <AvatarFallback>{account.name[0]}</AvatarFallback>
            </Avatar>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
};

export default RecomendedAccounts;
