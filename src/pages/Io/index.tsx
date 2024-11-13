import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TitleAndSubtitle from "../../components/TitleAndSubtitle";
import { Card } from "@mui/material";
import { io } from "socket.io-client";
import axios from "axios";

const IO: React.FC = () => {
  const [produtos, setProdutos] = useState<{ nome: string }[]>([]);
  const [produto, setProduto] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://192.168.0.9:5000/produtos", {
        nome: produto,
      });
      setProduto("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://192.168.0.9:5000/produtos");
        setProdutos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const socket = io("http://192.168.0.9:5000");

    socket.on("novoProduto", (product) => {
      setProdutos((prevProdutos) => [...prevProdutos, product]);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Layout>
      <TitleAndSubtitle title="Teste de socket" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={produto}
          onChange={({ target }) => setProduto(target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      <Card sx={{ padding: "1rem", boxShadow: "none" }}>
        {produtos.map((produto, index) => (
          <div key={index}>{produto.nome}</div>
        ))}
      </Card>
    </Layout>
  );
};

export default IO;
