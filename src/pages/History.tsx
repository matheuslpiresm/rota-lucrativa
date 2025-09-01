import { useEffect, useState } from "react";
import Container from "../components/Container";
import Text from "../components/Text";
import { jsPDF } from "jspdf";
import Button from "../components/Button";
import Modal from "../components/Modal";
import type { DailyDate } from "./Home";

export default function History() {
    const [reports, setReports] = useState<DailyDate[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [currentlyDay, setCurrentyDay] = useState<DailyDate[]>([]);
    const [isSelectionModalVisible, setIsSelectionModalVisible] = useState(false);

    function handleGenerateFullPdf() {
        const doc = new jsPDF();
        let y = 15;

        const fullTitle = `Relatório Geral`

        doc.setFontSize(20).text(fullTitle, 105, y, { align: 'center' });
        y += 15;

        doc.setFontSize(10).text('Data', 5, y);
        doc.text('Ganhos', 18, y);
        doc.text('Distância', 37, y);
        doc.text('Combustível', 55, y);
        doc.text('Parcela', 78, y);
        doc.text('Seguro', 94, y);
        doc.text('Manutenção', 110, y);
        doc.text('IPVA+Licenc', 132, y);
        doc.text('Pneus', 156, y);
        doc.text('Reserva', 172, y);
        doc.text('Resultado', 189, y);
        y += 5;
        doc.line(5, y, 205, y);
        y += 5;

        let totalGanhos = 0;
        let totalFinal = 0;
        let totalDistancia = 0;
        let totalCombustivel = 0;
        let totalParcela = 0;
        let totalSeguro = 0;
        let totalManutencao = 0;
        let totalIpva = 0;
        let totalLicenciamento = 0;
        let totalIpvaLicenciamento = 0;
        let totalPneus = 0;
        let totalReserva = 0;

        reports.forEach((report) => {
            const dateWithoutYear = report.date.split('/').slice(0, 2).join('/');
            const ipvaLicenciamento = report.ipva + report.licenciamento

            doc.text(dateWithoutYear, 5, y);
            doc.text(`${report.ganhos.toFixed(2)}`, 19, y);
            doc.text(`${report.distancia} km`, 39, y);
            doc.text(`${report.combustivel.toFixed(2)}`, 61, y);
            doc.text(`${report.parcela.toFixed(2)}`, 79, y);
            doc.text(`${report.seguro.toFixed(2)}`, 96, y);
            doc.text(`${report.manutencao.toFixed(2)}`, 115, y);
            doc.text(`${ipvaLicenciamento.toFixed(2)}`, 139, y);
            doc.text(`${report.pneus.toFixed(2)}`, 158, y);
            doc.text(`${report.reserva.toFixed(2)}`, 175, y);
            doc.text(`${report.resultadoFinal.toFixed(2)}`, 191, y);
            y += 7;

            totalGanhos += report.ganhos;
            totalDistancia += report.distancia;
            totalCombustivel += report.combustivel;
            totalParcela += report.parcela;
            totalSeguro += report.seguro;
            totalManutencao += report.manutencao;
            totalIpva += report.ipva;
            totalLicenciamento += report.licenciamento;
            totalIpvaLicenciamento = totalIpva + totalLicenciamento
            totalPneus += report.pneus;
            totalReserva += report.reserva;
            totalFinal += report.resultadoFinal;
        });

        doc.line(5, y, 205, y);
        y += 5;
        doc.setFontSize(10).text('Total', 5, y);
        doc.text(`R$${totalGanhos.toFixed(2)}`, 18, y);
        doc.text(`${totalDistancia.toFixed(2)}km`, 39, y);
        doc.text(`R$${totalCombustivel.toFixed(2)}`, 58, y);
        doc.text(`R$${totalParcela.toFixed(2)}`, 77, y);
        doc.text(`R$${totalSeguro.toFixed(2)}`, 94, y);
        doc.text(`R$${totalManutencao.toFixed(2)}`, 114, y);
        doc.text(`R$${totalIpvaLicenciamento.toFixed(2)}`, 136, y);
        doc.text(`R$${totalPneus.toFixed(2)}`, 156, y);
        doc.text(`R$${totalReserva.toFixed(2)}`, 172, y);
        doc.text(`R$${totalFinal.toFixed(2)}`, 189, y);

        doc.save('relatorio.pdf');
    }

    function handleGenerateMonthPdf() {
        const doc = new jsPDF();
        let y = 15;

        const currentMonthName = new Date().toLocaleDateString('pt-BR', { month: 'long' });
        const capitalizedMonthName = currentMonthName.charAt(0).toUpperCase() + currentMonthName.slice(1);

        const currentYear = new Date().getFullYear();
        const fullTitle = `Relatório ${capitalizedMonthName} de ${currentYear}`

        doc.setFontSize(20).text(fullTitle, 105, y, { align: 'center' });
        y += 15;

        doc.setFontSize(10).text('Data', 5, y);
        doc.text('Ganhos', 18, y);
        doc.text('Distância', 37, y);
        doc.text('Combustível', 55, y);
        doc.text('Parcela', 78, y);
        doc.text('Seguro', 94, y);
        doc.text('Manutenção', 110, y);
        doc.text('IPVA+Licenc', 132, y);
        doc.text('Pneus', 156, y);
        doc.text('Reserva', 172, y);
        doc.text('Resultado', 189, y);
        y += 5;
        doc.line(5, y, 205, y);
        y += 5;

        let totalGanhos = 0;
        let totalFinal = 0;
        let totalDistancia = 0;
        let totalCombustivel = 0;
        let totalParcela = 0;
        let totalSeguro = 0;
        let totalManutencao = 0;
        let totalIpva = 0;
        let totalLicenciamento = 0;
        let totalIpvaLicenciamento = 0;
        let totalPneus = 0;
        let totalReserva = 0;

        const currentMonth = new Date().getMonth() + 1;

        const monthReports = reports.filter(item => {
            const [, month, year] = item.date.split('/');

            return parseInt(month) === currentMonth && parseInt(year) === currentYear;
        });

        monthReports.forEach((report) => {
            const dateWithoutYear = report.date.split('/').slice(0, 2).join('/');
            const ipvaLicenciamento = report.ipva + report.licenciamento

            doc.text(dateWithoutYear, 5, y);
            doc.text(`${report.ganhos.toFixed(2)}`, 19, y);
            doc.text(`${report.distancia.toFixed(2)} km`, 39, y);
            doc.text(`${report.combustivel.toFixed(2)}`, 61, y);
            doc.text(`${report.parcela.toFixed(2)}`, 79, y);
            doc.text(`${report.seguro.toFixed(2)}`, 96, y);
            doc.text(`${report.manutencao.toFixed(2)}`, 115, y);
            doc.text(`${ipvaLicenciamento.toFixed(2)}`, 139, y);
            doc.text(`${report.pneus.toFixed(2)}`, 158, y);
            doc.text(`${report.reserva.toFixed(2)}`, 175, y);
            doc.text(`${report.resultadoFinal.toFixed(2)}`, 191, y);
            y += 7;

            totalGanhos += report.ganhos;
            totalDistancia += report.distancia;
            totalCombustivel += report.combustivel;
            totalParcela += report.parcela;
            totalSeguro += report.seguro;
            totalManutencao += report.manutencao;
            totalIpva += report.ipva;
            totalLicenciamento += report.licenciamento;
            totalIpvaLicenciamento = totalIpva + totalLicenciamento
            totalPneus += report.pneus;
            totalReserva += report.reserva;
            totalFinal += report.resultadoFinal;
        });

        doc.line(5, y, 205, y);
        y += 5;
        doc.setFontSize(10).text('Total', 5, y);
        doc.text(`R$${totalGanhos.toFixed(2)}`, 18, y);
        doc.text(`${totalDistancia}km`, 39, y);
        doc.text(`R$${totalCombustivel.toFixed(2)}`, 58, y);
        doc.text(`R$${totalParcela.toFixed(2)}`, 77, y);
        doc.text(`R$${totalSeguro.toFixed(2)}`, 94, y);
        doc.text(`R$${totalManutencao.toFixed(2)}`, 114, y);
        doc.text(`R$${totalIpvaLicenciamento.toFixed(2)}`, 136, y);
        doc.text(`R$${totalPneus.toFixed(2)}`, 156, y);
        doc.text(`R$${totalReserva.toFixed(2)}`, 172, y);
        doc.text(`R$${totalFinal.toFixed(2)}`, 189, y);

        doc.save('relatorio.pdf');
    }

    function handleShowData(date: string) {

        const currentlyDay = reports.find(day => day.date == date)

        if (currentlyDay) {
            setCurrentyDay([currentlyDay])
        } else {
            setCurrentyDay([]);
        }

        setIsModalVisible(true)
    }

    useEffect(() => {
        const storedData = localStorage.getItem('dailyReportsHistory');
        if (storedData) {
            try {
                const parsedData: DailyDate[] = JSON.parse(storedData);
                setReports(parsedData);
            } catch (error) {
                console.error('Erro ao fazer o parse dos dados do localStorage:', error);
            }
        }
    }, []);

    if (reports.length === 0) {
        return (
            <Container>
                <Text variant="body-md-bold" className="mb-4 flex">Histórico</Text>
                <Text>Nenhum registro encontrado.</Text>
            </Container>
        );
    }

    return (
        <Container>
            <Text variant="body-md-bold" className="flex items-center gap-2 mb-4">
                Histórico
            </Text>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="hidden md:table-header-group text-xs text-gray-700 uppercase bg-gray-100 font-bold" >
                        <tr>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Ganhos</th>
                            <th scope="col" className="px-6 py-3">Distância</th>
                            <th scope="col" className="px-6 py-3">Resultado Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr
                                key={report.id}
                                className="block md:table-row mb-4 md:mb-0 border md:border-none border-gray-200 rounded-lg shadow-lg md:shadow-none cursor-pointer"
                                onClick={() => handleShowData(report.date)}
                            >
                                <td className="block md:table-cell px-6 py-1 md:py-4 font-medium text-gray-900 md:border-b">
                                    <Text variant="table-body" className="font-semibold text-gray-900 md:hidden">Data: </Text>
                                    <Text variant="table-body">{report.date}</Text>
                                </td>
                                <td className="block md:table-cell px-6 py-1 md:py-4 md:border-b">
                                    <Text variant="table-body" className="font-semibold text-gray-900 md:hidden">Ganhos: </Text>
                                    <Text variant="table-body">R$ {report.ganhos.toFixed(2)}</Text>
                                </td>
                                <td className="block md:table-cell px-6 py-1 md:py-4 md:border-b">
                                    <Text variant="table-body" className="font-semibold text-gray-900 md:hidden">Distância: </Text>
                                    <Text variant="table-body">{report.distancia} km</Text>
                                </td>
                                <td className={`block md:table-cell px-6 py-1 md:py-4 md:border-b font-bold text-green-600`}>
                                    <span>
                                        <Text variant="table-body" className="font-semibold text-gray-900 md:hidden">Resultado Final: </Text>
                                        <Text variant="table-body" className={report.resultadoFinal >= 0 ? "text-green-200" : "text-red-100"}>R$ {report.resultadoFinal.toFixed(2)}</Text>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalVisible && currentlyDay.length > 0 && (
                <Modal
                    isVisible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                    message={
                        <div className="p-2">
                            <Text variant="body-md-bold">Relatório do dia</Text>
                            <div className="flex flex-col items-start mt-2">
                                <Text variant="table-body">
                                    <span className="font-semibold">Data: </span>{currentlyDay[0].date}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">Ganhos: </span>R$ {currentlyDay[0].ganhos.toFixed(2)}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">Distância: </span>{currentlyDay[0].distancia} km
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">Combustível: </span>R$ {currentlyDay[0].combustivel.toFixed(2)}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">Parcela: </span>R$ {currentlyDay[0].parcela.toFixed(2)}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">Seguro: </span>R$ {currentlyDay[0].seguro.toFixed(2)}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">Manutenção: </span>R$ {currentlyDay[0].manutencao.toFixed(2)}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">IPVA: </span>R$ {currentlyDay[0].ipva.toFixed(2)}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">Licenciamento: </span>R$ {currentlyDay[0].licenciamento.toFixed(2)}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">Pneus: </span>R$ {currentlyDay[0].pneus.toFixed(2)}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold">Reserva: </span>R$ {currentlyDay[0].reserva.toFixed(2)}
                                </Text>
                                <Text variant="table-body">
                                    <span className="font-semibold" >Resultado Final: </span>R$ {currentlyDay[0].resultadoFinal.toFixed(2)}
                                </Text>
                            </div>
                        </div>
                    }
                />
            )}

            <div className="flex justify-center mt-4">
                <Button variant={"terciary"} size={"lg"} type="button" onClick={() => setIsSelectionModalVisible(true)}>Gerar Relatório</Button>
            </div>

            <Modal
                isVisible={isSelectionModalVisible}
                onClose={() => setIsSelectionModalVisible(false)}
                message={
                    <div className="flex flex-col gap-4">
                        <Text variant="body-md-bold">Escolha o tipo de relatório</Text>

                        <Button onClick={() => {
                            handleGenerateMonthPdf();
                            setIsSelectionModalVisible(false);
                        }}>
                            Gerar Relatório Mensal
                        </Button>

                        <Button onClick={() => {
                            handleGenerateFullPdf();
                            setIsSelectionModalVisible(false);
                        }}>
                            Gerar Relatório Geral
                        </Button>
                    </div>
                }
            />
        </Container >
    );
}