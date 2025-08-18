import Budget from "../components/Budget";
import Container from "../components/Container";
import Text from "../components/Text";
import { useEffect, useState } from "react";
import BudgetEntry from "../components/BudgetEntry";
import type { VehicleFormData } from "../components/VehicleForm";

export default function Home() {
    const [ganhos, setGanhos] = useState(0);
    const [distancia, setDistancia] = useState(0);
    const [combustivel, setCombustivel] = useState(0);
    const [parcela, setParcela] = useState(0);
    const [seguro, setSeguro] = useState(0);
    const [manutencao, setManutencao] = useState(0);
    const [ipva, setIpva] = useState(0);
    const [licenciamento, setLicenciamento] = useState(0);
    const [pneus, setPneus] = useState(0);
    const [reserva, setReserva] = useState(0);
    const [lucro, setLucro] = useState(0)
    const [formData, setFormData] = useState<VehicleFormData | null>(null)

    function handleCalculate() {
        if (distancia == 0 || ganhos == 0) {
            alert('Preencha todos os campos')
            return
        }

        if (formData) {
            const { diasTrabalhados, consumo, precoGasolina, manutencaoValor, manutencaoKm, pneusValor, pneusKm, ipva, licenciamento, seguro, parcela, reserva } = formData

            const custoCombustivel = distancia / consumo * precoGasolina;
            const custoParcela = parcela / diasTrabalhados;
            const custoSeguro = seguro / 12 / diasTrabalhados;
            const custoManutencao = distancia * (manutencaoValor / manutencaoKm);
            const custoIpva = ipva / 12 / diasTrabalhados;
            const custoLicenciamento = licenciamento / 12 / diasTrabalhados;
            const custoPneus = distancia * (pneusValor / pneusKm);
            const custoReserva = reserva;

            const lucroFinal = ganhos - custoCombustivel - custoParcela - custoSeguro - custoManutencao - custoIpva - custoLicenciamento - custoPneus - custoReserva;

            setCombustivel(custoCombustivel);
            setParcela(custoParcela);
            setSeguro(custoSeguro);
            setManutencao(custoManutencao);
            setIpva(custoIpva);
            setLicenciamento(custoLicenciamento);
            setPneus(custoPneus);
            setReserva(custoReserva);
            setLucro(lucroFinal);
        }
    };

    function handleClear() {
        setGanhos(0)
        setDistancia(0)
        setCombustivel(0)
        setParcela(0)
        setSeguro(0)
        setManutencao(0)
        setIpva(0)
        setLicenciamento(0)
        setPneus(0)
        setReserva(0)
        setLucro(0)
    }

    function handleVerifySettings() {
        if (!formData) {
            alert('É necessário ir na aba de configurações e preencher os dados do veículo');
            handleClear();
            return
        }

        handleCalculate()
    }

    useEffect(() => {
        const storedData = localStorage.getItem('vehicleFormData');

        if (storedData) {
            try {
                const parsedData: VehicleFormData = JSON.parse(storedData);

                const formattedData: VehicleFormData = {
                    diasTrabalhados: Number(parsedData.diasTrabalhados),
                    consumo: Number(parsedData.consumo),
                    precoGasolina: Number(parsedData.precoGasolina),
                    manutencaoValor: Number(parsedData.manutencaoValor),
                    manutencaoKm: Number(parsedData.manutencaoKm),
                    pneusValor: Number(parsedData.pneusValor),
                    pneusKm: Number(parsedData.pneusKm),
                    ipva: Number(parsedData.ipva),
                    licenciamento: Number(parsedData.licenciamento),
                    seguro: Number(parsedData.seguro),
                    parcela: Number(parsedData.parcela),
                    reserva: Number(parsedData.reserva),
                };

                setFormData(formattedData);
            } catch (error) {
                console.error('Erro ao fazer o parse dos dados do localStorage:', error);
            }
        }
    }, []);

    return (
        <Container>
            <Text variant="body-md-bold">Dashboard</Text>

            <div>
                <BudgetEntry
                    variant="secondary"
                    size="lg"

                    firstInput={{
                        label: "Ganhos do dia",
                        value: ganhos ? ganhos : "",
                        onChange: (e) => setGanhos(Number(e.target.value)),
                        placeholder: "R$ 0,00",
                        type: "number",
                    }}

                    secondInput={{
                        label: "KM Rodado",
                        value: distancia ? distancia : "",
                        onChange: (e) => setDistancia(Number(e.target.value)),
                        placeholder: "0 km",
                        type: "number",
                    }}

                    calculateButtonText="Calcular"
                    onCalculate={handleVerifySettings}

                    clearButtonText="Limpar"
                    onClear={handleClear}
                />
            </div>

            <Text variant="body-md-bold">Custos Diários</Text>
            <div className="flex flex-wrap gap-4 mb-2">
                <Budget
                    size="sm"
                    topText="Combustível"
                    bottomText={`R$ ${combustivel.toFixed(2)}`}
                />

                <Budget
                    size="sm"
                    topText="Parcela do Carro"
                    bottomText={`R$ ${parcela.toFixed(2)}`}
                />

                <Budget
                    size="sm"
                    topText="Seguro"
                    bottomText={`R$ ${seguro.toFixed(2)}`}
                />

                <Budget
                    size="sm"
                    topText="Manutenção"
                    bottomText={`R$ ${manutencao.toFixed(2)}`}
                />

                <Budget
                    size="sm"
                    topText="IPVA"
                    bottomText={`R$ ${ipva.toFixed(2)}`}
                />

                <Budget
                    size="sm"
                    topText="Licenciamento"
                    bottomText={`R$ ${licenciamento.toFixed(2)}`}
                />

                <Budget
                    size="sm"
                    topText="Pneus"
                    bottomText={`R$ ${pneus.toFixed(2)}`}
                />

                <Budget
                    size="sm"
                    topText="Reserva de Emergência"
                    bottomText={`R$ ${reserva}`}
                />
            </div>

            <Budget
                variant={"secondary"}
                size="md"
                topText={
                    <span
                        style={{
                            fontSize: '20px',
                            color: lucro >= 0 ? '#2ac553' : '#ff0000',
                        }}
                    >
                        Resultado do Dia
                    </span>
                }
                bottomText={
                    <span
                        style={{
                            fontSize: '20px',
                            color: lucro >= 0 ? '#2ac553' : '#ff0000',
                        }}
                    >
                        {`R$ ${lucro.toFixed(2)}`}
                    </span>
                }
            />
        </Container>
    )
}