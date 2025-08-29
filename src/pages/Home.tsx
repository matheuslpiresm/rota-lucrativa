import Budget from "../components/Budget";
import Container from "../components/Container";
import Text from "../components/Text";
import { useEffect, useState } from "react";
import BudgetEntry from "../components/BudgetEntry";
import type { VehicleFormData } from "../components/VehicleForm";
import Modal from "../components/Modal";


export interface DailyDate {
    id: number;
    date: string;
    ganhos: number,
    distancia: number,
    resultadoFinal: number,
    combustivel: number,
    parcela: number,
    seguro: number,
    manutencao: number,
    ipva: number,
    licenciamento: number,
    pneus: number,
    reserva: number,
}

export default function Home() {
    const [ganhos, setGanhos] = useState(0);
    const [distancia, setDistancia] = useState(0);
    const [date, setDate] = useState('');
    const [combustivel, setCombustivel] = useState(0);
    const [parcela, setParcela] = useState(0);
    const [seguro, setSeguro] = useState(0);
    const [manutencao, setManutencao] = useState(0);
    const [ipva, setIpva] = useState(0);
    const [licenciamento, setLicenciamento] = useState(0);
    const [pneus, setPneus] = useState(0);
    const [reserva, setReserva] = useState(0);
    const [resultado, setResultado] = useState(0)
    const [formData, setFormData] = useState<VehicleFormData | null>(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const myInputs = [
        {
            label: "Ganhos do dia",
            value: ganhos ? ganhos : "",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setGanhos(Number(e.target.value)),
            placeholder: "R$ 0,00",
            type: "number",
        },
        {
            label: "KM Rodado",
            value: distancia ? distancia : "",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDistancia(Number(e.target.value)),
            placeholder: "0 km",
            type: "number",
        },
        {
            label: "Data",
            placeholder: "0 km",
            type: "date",
            value: date ? date : "",
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDate((e.target.value)),
        }
    ];

    function handleCalculate() {
        if (distancia == 0 || ganhos == 0 || !date) {
            setModalMessage('Preencha todos os campos');
            setIsModalVisible(true);
            return
        }

        if (formData) {
            const { diasTrabalhados, consumo, precoGasolina, manutencaoValor, manutencaoKm, pneusValor, pneusKm, ipva, licenciamento, seguro, parcela, reserva } = formData


            if (!diasTrabalhados || !consumo || !precoGasolina) {
                setModalMessage('Preencha os campos obrigatórios na página de configurações');
                setIsModalVisible(true);
                return
            }

            const custoCombustivel = consumo ? distancia / consumo * precoGasolina : 0;
            const custoParcela = diasTrabalhados ? parcela / diasTrabalhados : 0;
            const custoSeguro = diasTrabalhados ? seguro / 12 / diasTrabalhados : 0;
            const custoManutencao = manutencaoKm ? distancia * (manutencaoValor / manutencaoKm) : 0;
            const custoIpva = diasTrabalhados ? ipva / 12 / diasTrabalhados : 0;
            const custoLicenciamento = diasTrabalhados ? licenciamento / 12 / diasTrabalhados : 0;
            const custoPneus = pneusKm ? distancia * (pneusValor / pneusKm) : 0;
            const custoReserva = reserva || 0

            const resultadoFinal = ganhos - custoCombustivel - custoParcela - custoSeguro - custoManutencao - custoIpva - custoLicenciamento - custoPneus - custoReserva;

            const [year, month, day] = date.split('-').map(Number);
            const localDate = new Date(year, month - 1, day);
            const currentlyDate = localDate.toLocaleDateString('pt-BR');
            const id = new Date().getTime();


            const data: DailyDate[] = [{
                id,
                date: currentlyDate,
                ganhos,
                distancia,
                resultadoFinal,
                combustivel: custoCombustivel,
                parcela: custoParcela,
                seguro: custoSeguro,
                manutencao: custoManutencao,
                ipva: custoIpva,
                licenciamento: custoLicenciamento,
                pneus: custoPneus,
                reserva: custoReserva,
            }];

            handleSaveDay(data)

            setCombustivel(custoCombustivel);
            setParcela(custoParcela);
            setSeguro(custoSeguro);
            setManutencao(custoManutencao);
            setIpva(custoIpva);
            setLicenciamento(custoLicenciamento);
            setPneus(custoPneus);
            setReserva(custoReserva);
            setResultado(resultadoFinal);

            handleClearEntry()
        }
    };

    function handleSaveDay(dataArray: DailyDate[]) {
        const [{ ganhos, distancia, resultadoFinal, combustivel, parcela, seguro, manutencao, ipva, licenciamento, pneus, reserva }] = dataArray
        if (resultadoFinal === 0 && ganhos === 0) {
            setModalMessage('Calcule os ganhos do dia antes de salvar.');
            setIsModalVisible(true);
            return;
        }

        const [year, month, day] = date.split('-').map(Number);

        const localDate = new Date(year, month - 1, day);

        const currentlyDate = localDate.toLocaleDateString('pt-BR');

        const newDayData = {
            id: new Date().getTime(),
            date: currentlyDate,
            combustivel: combustivel,
            parcela: parcela,
            seguro: seguro,
            manutencao: manutencao,
            ipva: ipva,
            licenciamento: licenciamento,
            pneus: pneus,
            ganhos: ganhos,
            reserva: reserva,
            resultadoFinal: resultadoFinal,
            distancia: distancia,
        };

        try {
            const existingHistoryJSON = localStorage.getItem('dailyReportsHistory');
            const existingHistory = existingHistoryJSON ? JSON.parse(existingHistoryJSON) : [];

            const todayIndex = existingHistory.findIndex((report: any) => report.date === currentlyDate);

            let updatedHistory;

            if (todayIndex > -1) {

                updatedHistory = [...existingHistory];

                updatedHistory[todayIndex] = { ...newDayData, id: existingHistory[todayIndex].id };
                setModalMessage('Dados atualizados com sucesso!');
                setIsModalVisible(true);
            } else {

                updatedHistory = [...existingHistory, newDayData];
                setModalMessage('Dados salvos com sucesso!');
                setIsModalVisible(true);
            }

            const dataString = JSON.stringify(updatedHistory);
            localStorage.setItem('dailyReportsHistory', dataString);

        } catch (error) {
            console.error("Falha ao salvar o dia no histórico:", error);
            setModalMessage('Ocorreu um erro ao salvar os dados.');
            setIsModalVisible(true);
        }
    }

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
        setResultado(0)
        setDate('')
    }

    function handleClearEntry() {
        setGanhos(0)
        setDistancia(0)
        setDate('')
    }

    function handleVerifySettings() {
        if (!formData) {
            setModalMessage('É necessário ir na aba de configurações e preencher os dados do veículo.');
            setIsModalVisible(true);
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
                    inputs={myInputs}
                    calculateButtonText="Calcular"
                    onCalculate={handleVerifySettings}
                    clearButtonText="Limpar"
                    onClear={handleClear}
                    className="mb-3"
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
                            color: resultado >= 0 ? '#2ac553' : '#ff0000',
                        }}
                    >
                        Resultado do Dia
                    </span>
                }
                bottomText={
                    <span
                        style={{
                            fontSize: '20px',
                            color: resultado >= 0 ? '#2ac553' : '#ff0000',
                        }}
                    >
                        {`R$ ${resultado.toFixed(2)}`}
                    </span>
                }
            />

            <Modal
                isVisible={isModalVisible}
                message={
                    <div>
                        <Text variant="table-body">{modalMessage}</Text>
                    </div>
                }

                onClose={() => {
                    setIsModalVisible(false);
                    setModalMessage('');
                }}
            />
        </Container>
    )
}