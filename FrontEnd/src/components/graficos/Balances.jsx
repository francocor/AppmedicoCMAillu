import React, { useState } from "react";
import FiltrosGraficos from "@/components/graficos/FiltrosGraficos";
import FiltrosComparacionGraficos from "@/components/graficos/FiltrosComparacionGraficos";
import GraficoBarras from "@/components/graficos/GraficoBarras";
import ComparacionGraficos from "@/components/graficos/ComparacionGraficos";
import BotonHarmonia from "@/components/ui/BotonHarmonia";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

// 👉 Simulación de rol, en el futuro esto se saca del auth/contexto
const role = "secretaria"; // o "profesional"

export default function Balance() {
  const [tipoGrafico, setTipoGrafico] = useState("bar");
  const [comparar, setComparar] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  return (
    <main className="flex-1 px-6 py-8 overflow-y-auto">
      <h1 className="text-center text-4xl font-montserrat mb-6">Gráficos</h1>

      {/* Solo visible para secretaria */}
      {role === "secretaria" && (
        <div className="mb-6 max-w-md">
          <label className="text-lg font-semibold text-black block mb-2">
            Seleccionar médico:
          </label>
          <Select onValueChange={setSelectedDoctor}>
            <SelectTrigger className="w-full border border-black rounded-md">
              <SelectValue placeholder="Elegir médico" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pepito">Dr. Pepito Fernández</SelectItem>
              <SelectItem value="juarez">Dra. Juárez</SelectItem>
              <SelectItem value="otro">Otro Médico</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Filtros principales */}
      <FiltrosGraficos
        tipoGrafico={tipoGrafico}
        setTipoGrafico={setTipoGrafico}
        comparar={comparar}
        setComparar={setComparar}
      />

      {/* Gráfico principal */}
      {tipoGrafico === "bar" && (
        <section className="mt-10">
          <GraficoBarras />
        </section>
      )}

      {/* Comparación */}
      {comparar && (
        <section className="mt-10 space-y-6">
          <h2 className="text-2xl font-montserrat">Filtros para comparar</h2>
          <FiltrosComparacionGraficos
            tipoGrafico={tipoGrafico}
            setTipoGrafico={setTipoGrafico}
          />
          <ComparacionGraficos />
        </section>
      )}

      {/* Notas */}
      <section className="mt-10">
        <h2 className="text-2xl font-montserrat mb-2">Notas:</h2>
        <textarea
          className="w-full h-[100px] border border-black p-2 rounded-[20px] shadow-sm"
          placeholder="Escriba sus notas o comentarios sobre los resultados..."
        />

        <div className="flex justify-end mt-4 space-x-4">
          <BotonHarmonia>Guardar Nota</BotonHarmonia>
          <BotonHarmonia>Limpiar</BotonHarmonia>
          <BotonHarmonia onClick={() => setComparar(!comparar)}>
            {comparar ? "Quitar comparación" : "Activar comparación"}
          </BotonHarmonia>
        </div>
      </section>
    </main>
  );
}