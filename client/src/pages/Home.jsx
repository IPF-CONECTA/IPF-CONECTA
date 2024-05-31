import React from "react";
import { Navigation } from "./Nav";
import { FinPag } from "./Footer";
import { Menu } from "./Main";

export const Inicio = () => {
  return (
    <html>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <div className="root">
        <Navigation />
        <Menu />
        <FinPag />
      </div>
    </html>
  );
};
