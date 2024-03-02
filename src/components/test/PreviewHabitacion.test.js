import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import PreviewHabitacion from "../PreviewHabitacion";

jest.mock("../../hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({ auth: { _id: "creador-id" } }),
}));

describe("PreviewHabitacion", () => {
  const habitacion = {
    _id: "habitacion-id",
    nombre: "Nombre del habitacion",
    cliente: "Cliente",
    creador: "creador-id",
  };

  it("renders correctly", () => {
    render(
      <BrowserRouter>
        <PreviewHabitacion habitacion={habitacion} />
      </BrowserRouter>
    );

    expect(screen.getByText("Nombre del habitacion")).toBeInTheDocument();
    expect(screen.getByText("Cliente")).toBeInTheDocument();
    expect(screen.getByText("Ver Habitacion")).toBeInTheDocument();
  });

  it("the link points to the correct URL", () => {
    render(
      <BrowserRouter>
        <PreviewHabitacion habitacion={habitacion} />
      </BrowserRouter>
    );

    expect(screen.getByText("Ver Habitacion")).toHaveAttribute(
      "href",
      "/habitacion-id"
    );
  });
});
