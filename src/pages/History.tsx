import { useEffect, useState } from "react";
import Container from "../components/Container";
import Text from "../components/Text";
import { jsPDF } from "jspdf";
import Button from "../components/Button";

interface DailyReport {
    id: number;
    date: string;
    ganhos: number;
    lucroFinal: number;
    distancia: number;
}

export default function History() {
    const [reports, setReports] = useState<DailyReport[]>([]);

    function handleGeneratePdf() {
        const doc = new jsPDF();
        let y = 15;

        doc.setFontSize(22).text('Histórico de Relatórios Diários', 105, y, { align: 'center' });
        y += 15;

        doc.setFontSize(12).text('Data', 10, y);
        doc.text('Ganhos', 60, y);
        doc.text('Distância', 110, y);
        doc.text('Lucro Real', 160, y);
        y += 5;
        doc.line(5, y, 190, y);
        y += 5;

        let totalGanhos = 0;
        let totalLucro = 0;

        reports.forEach((report) => {
            doc.text(report.date, 10, y);
            doc.text(`R$ ${report.ganhos.toFixed(2)}`, 60, y);
            doc.text(`${report.distancia} km`, 110, y);
            doc.text(`R$ ${report.lucroFinal.toFixed(2)}`, 160, y);
            y += 7;

            totalGanhos += report.ganhos;
            totalLucro += report.lucroFinal;
        });

        doc.line(5, y, 190, y);
        y += 5;
        doc.setFontSize(12).text('TOTAL', 10, y);
        doc.text(`R$ ${totalGanhos.toFixed(2)}`, 60, y);
        doc.text(`R$ ${totalLucro.toFixed(2)}`, 160, y);

        doc.save('historico.pdf');
    }

    useEffect(() => {
        const storedData = localStorage.getItem('dailyReportsHistory');
        if (storedData) {
            try {
                const parsedData: DailyReport[] = JSON.parse(storedData);
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
                    <thead className="hidden md:table-header-group text-xs text-gray-700 uppercase bg-gray-100 font-bold">
                        <tr>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Ganhos</th>
                            <th scope="col" className="px-6 py-3">Distância</th>
                            <th scope="col" className="px-6 py-3">Lucro Real</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr
                                key={report.id}
                                className="block md:table-row mb-4 md:mb-0 border md:border-none border-gray-200 rounded-lg shadow-lg md:shadow-none"
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
                                        <Text variant="table-body" className="font-semibold text-gray-900 md:hidden">Lucro Real: </Text>
                                        <Text variant="table-body" className={report.lucroFinal >= 0 ? "text-green-200" : "text-red-100"}>R$ {report.lucroFinal.toFixed(2)}</Text>
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <Button variant={"terciary"} size={"lg"} type="button" onClick={handleGeneratePdf}>Gerar PDF</Button>
            </div>

        </Container>
    );
}