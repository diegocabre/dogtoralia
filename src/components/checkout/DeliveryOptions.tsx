"use client";

import { useState, useEffect } from "react";

const LOCATIONS = [
    {
        name: "Sede Puente Alto",
        address: "Av. Concha y Toro 3859",
    },
    {
        name: "Sede Santiago Centro",
        address: "Av. Presidente Balmaceda 2776",
    },
];

const REGIONES = [
    "Región Metropolitana",
    "Valparaíso",
    "Biobío",
    "O'Higgins",
    "Maule",
    "Araucanía",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Los Lagos",
    "Los Ríos",
    "Magallanes",
    "Tarapacá",
    "Arica y Parinacota",
    "Ñuble",
    "Aysén",
];

const COMUNAS_SANTIAGO = [
    "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Santiago", "Vitacura"
];

export default function DeliveryOptions({
    onChange
}: {
    onChange?: (data: any) => void;
}) {
    const [method, setMethod] = useState<"store" | "shipping" | "">("");
    const [store, setStore] = useState("");
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [address, setAddress] = useState("");

    const isSantiago = region === "Región Metropolitana" && COMUNAS_SANTIAGO.includes(comuna);
    const shippingCost = method === "shipping"
        ? (isSantiago ? 5000 : "Por pagar en destino (transporte externo)")
        : 0;

    // Callback para el padre SOLO cuando cambian los valores
    useEffect(() => {
        if (onChange) {
            onChange({ method, store, region, comuna, address, shippingCost });
        }
    }, [method, store, region, comuna, address, shippingCost, onChange]);

    return (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Opciones de Entrega</h2>
            <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="delivery-method"
                        value="store"
                        checked={method === "store"}
                        onChange={() => setMethod("store")}
                    />
                    Retiro en tienda
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="delivery-method"
                        value="shipping"
                        checked={method === "shipping"}
                        onChange={() => setMethod("shipping")}
                    />
                    Envío a domicilio
                </label>
            </div>

            {method === "store" && (
                <div className="mt-4">
                    <label className="block mb-2 font-medium">Selecciona la sucursal:</label>
                    <select
                        className="w-full border rounded p-2"
                        value={store}
                        onChange={e => setStore(e.target.value)}
                    >
                        <option value="">Selecciona una sucursal</option>
                        {LOCATIONS.map((loc) => (
                            <option key={loc.name} value={loc.name}>{loc.name} - {loc.address}</option>
                        ))}
                    </select>
                </div>
            )}

            {method === "shipping" && (
                <div className="mt-4 space-y-3">
                    <label className="block font-medium">Región:</label>
                    <select
                        className="w-full border rounded p-2"
                        value={region}
                        onChange={e => { setRegion(e.target.value); setComuna(""); }}
                    >
                        <option value="">Selecciona una región</option>
                        {REGIONES.map((reg) => (
                            <option key={reg} value={reg}>{reg}</option>
                        ))}
                    </select>

                    {region && (
                        <>
                            <label className="block font-medium">Comuna:</label>
                            <select
                                className="w-full border rounded p-2"
                                value={comuna}
                                onChange={e => setComuna(e.target.value)}
                            >
                                <option value="">Selecciona una comuna</option>
                                {region === "Región Metropolitana"
                                    ? COMUNAS_SANTIAGO.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))
                                    : <option value="Otra">Otra</option>
                                }
                            </select>
                        </>
                    )}

                    <label className="block font-medium">Dirección:</label>
                    <input
                        className="w-full border rounded p-2"
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Calle, número, depto, etc."
                    />

                    <div className="mt-2 text-sm text-gray-700">
                        {region && (
                            isSantiago
                                ? <>Costo de envío: <span className="font-semibold">$5.000</span> (solo Santiago)</>
                                : <>Costo de envío: <span className="font-semibold">Por pagar en destino</span> (transporte externo)</>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
} 