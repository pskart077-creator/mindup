"use client";

import { useEffect, useState } from "react";
import styles from "./purchase-toast.module.css";

const NAMES = [
  "Camila Rocha",
  "Leandro Martins",
  "Mariana Lopes",
  "Rafael Almeida",
  "Bruna Cardoso",
  "Diego Ferreira",
  "Aline Barbosa",
  "Gustavo Mendes",
  "Juliana Castro",
  "Felipe Nogueira",
  "Fernanda Ribeiro",
  "Thiago Moreira",
  "Larissa Teixeira",
  "Marcos Vieira",
  "Beatriz Oliveira",
  "Lucas Azevedo",
  "Carolina Batista",
  "Bruno Carvalho",
  "Amanda Freitas",
  "Eduardo Pires",
  "Isabela Monteiro",
  "Henrique Duarte",
  "Patricia Campos",
  "Matheus Farias",
  "Renata Lima",
  "Rodrigo Santana",
  "Leticia Moraes",
  "Fabio Rezende",
  "Gabriela Tavares",
  "Caio Fernandes",
  "Vanessa Correia",
  "Daniel Siqueira",
  "Priscila Andrade",
  "Marcelo Cunha",
  "Talita Gomes",
  "Vitor Peixoto",
  "Natalia Guedes",
  "Andre Barros",
  "Roberta Machado",
  "Vinicius Costa",
  "Bianca Reis",
  "Pedro Santiago",
  "Debora Assis",
  "Samuel Brito",
  "Rafaela Matos",
  "Joao Sales",
  "Luana Amaral",
  "Alex Soares",
  "Thais Pinheiro",
  "Murilo Figueiredo",
  "Marcela Antunes",
  "Igor Vasconcelos",
  "Yasmin Prado",
  "Cesar Queiroz",
  "Michele Furtado",
  "Renan Borges",
  "Paula Neves",
  "Otavio Meireles",
  "Viviane Araujo",
  "Leonardo Mello",
  "Cristiane Viana",
  "Danilo Rangel",
  "Simone Macedo",
  "Arthur Coelho",
  "Andrea Dantas",
  "Sergio Teles",
  "Monique Xavier",
  "Paulo Aguiar",
  "Elisa Cavalcante",
  "Mauricio Leite",
  "Helena Paiva",
  "Ricardo Valente",
  "Sabrina Cerqueira",
  "Fernando Lacerda",
  "Jaqueline Bastos",
  "Wesley Moura",
  "Mayara Albuquerque",
  "Cauã Fontes",
  "Ingrid Magalhaes",
  "Davi Portugal",
  "Livia Goncalves",
  "Hugo Beltrao",
  "Flavia Seixas",
  "Cicero Noronha",
  "Samara Mesquita",
  "Guilherme Pacheco",
  "Jessica Fonseca",
  "Nicolas Sampaio",
  "Rebeca Carneiro",
  "Elias Guimaraes",
  "Tatiane Domingues",
  "Kevin Miranda",
  "Adriana Torres",
  "Jonathan Marques",
  "Lorena Caldas",
  "Enzo Silveira",
  "Manuela Falcao",
  "Icaro Brandao",
] as const;

const QUANTITIES = [2, 3, 5, 2, 1, 3, 2, 5] as const;
const VISIBLE_MS = 5200;
const GAP_MS = 3200;
const INITIAL_DELAY_MS = 2400;

const PURCHASES = NAMES.map((name, index) => ({
  name,
  quantity: QUANTITIES[index % QUANTITIES.length],
}));

function formatQuantity(quantity: number) {
  return `${quantity} ${quantity === 1 ? "frasco" : "frascos"}`;
}

export function PurchaseToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      const startTimer = window.setTimeout(() => {
        setStarted(true);
        setVisible(true);
      }, INITIAL_DELAY_MS);

      return () => window.clearTimeout(startTimer);
    }

    if (visible) {
      const hideTimer = window.setTimeout(() => {
        setVisible(false);
      }, VISIBLE_MS);

      return () => window.clearTimeout(hideTimer);
    }

    const nextTimer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % PURCHASES.length);
      setVisible(true);
    }, GAP_MS);

    return () => window.clearTimeout(nextTimer);
  }, [started, visible]);

  const purchase = PURCHASES[index];

  return (
    <aside
      className={`${styles.toast} ${visible ? styles.visible : styles.hidden}`}
      aria-live="polite"
      aria-atomic="true"
      aria-hidden={!visible}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M20 7L9 18L4 13"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className={styles.copy}>
        <strong>{purchase.name}</strong> comprou{" "}
        <strong>{formatQuantity(purchase.quantity)}</strong>
        <small>Frete grátis aplicado</small>
      </span>
    </aside>
  );
}
