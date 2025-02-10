import { Weigh } from "@/app/interfaces";
import clsx from "clsx";

interface Props {
    selectedWeigh?: Weigh; // ✅ Cambio de `selecterWeigh` a `selectedWeigh`
    availableWeigh?: Weigh[]; // ✅ Cambio de `avaiableWeigh` a `availableWeigh`
}

export const WeighSelector = ({ selectedWeigh, availableWeigh }: Props) => {
    return (
        <div className="my-5">
            <h3 className="mb-4 font-bold">Formatos disponibles:</h3>
            <div className="flex">
                {availableWeigh?.map(weigh => (
                    <button
                        key={weigh}
                        type="button" // ✅ Asegura que sea un botón sin enviar formularios
                        className={clsx(
                            "mx-2 py-2 px-4 rounded text-lg border border-gray-300",
                            {
                                "bg-accent text-white": selectedWeigh === weigh,
                                "hover:bg-gray-200": selectedWeigh !== weigh
                            }
                        )}
                    >
                        {weigh}
                    </button>
                ))}
            </div>
        </div>
    );
};
