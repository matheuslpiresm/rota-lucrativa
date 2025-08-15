import { useEffect, useState } from 'react';
import Text from './Text';
import type { VehicleFormData } from './VehicleForm';

export default function SettingsCard() {
    const [formData, setFormData] = useState<VehicleFormData | null>(null)

    useEffect(() => {
        const storedData = localStorage.getItem('vehicleFormData');

        if (storedData) {
            try {
                const parsedData: VehicleFormData = JSON.parse(storedData);
                setFormData(parsedData);
            } catch (error) {
                console.error('Erro ao fazer o parse dos dados do localStorage:', error);
            }
        }
    }, []);

    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md max-w-md w-full h-96">
            <Text variant="body-md-bold" className="text-black mb-4">Seus dados salvos atualmente:</Text>
            <div className="flex flex-col gap-2">
                <Text>
                    Dias trabalhados no mês: <span className="font-semibold">{formData?.diasTrabalhados ?? '-'}</span>
                </Text>
                <Text>
                    Consumo do Veículo: <span className="font-semibold">{formData?.consumo ? `${formData.consumo} KM/L` : '-'}</span>
                </Text>
                <Text>
                    Preço da Gasolina: <span className="font-semibold">{formData?.precoGasolina ? `R$ ${formData.precoGasolina}` : '-'}</span>
                </Text>
                <Text>
                    Manutenção:
                    {formData?.manutencaoValor && formData?.manutencaoKm ? (
                        <span className="font-semibold"> R$ {formData.manutencaoValor} a cada {formData.manutencaoKm} KM</span>
                    ) : (
                        <span className="font-semibold"> -</span>
                    )}
                </Text>
                <Text>
                    Pneus:
                    {formData?.pneusValor && formData?.pneusKm ? (
                        <span className="font-semibold"> R$ {formData.pneusValor} a cada {formData.pneusKm} KM</span>
                    ) : (
                        <span className="font-semibold"> -</span>
                    )}
                </Text>
                <Text>
                    IPVA: <span className="font-semibold">{formData?.ipva ? `R$ ${formData.ipva}` : '-'}</span>
                </Text>
                <Text>
                    Licenciamento: <span className="font-semibold">{formData?.licenciamento ? `R$ ${formData.licenciamento}` : '-'}</span>
                </Text>
                <Text>
                    Seguro: <span className="font-semibold">{formData?.seguro ? `R$ ${formData.seguro}` : '-'}</span>
                </Text>
                <Text>
                    Valor da Parcela do Veículo: <span className="font-semibold">{formData?.parcela ? `R$ ${formData.parcela}` : '-'}</span>
                </Text>
                <Text>
                    Reserva de Emergência: <span className="font-semibold">{formData?.reserva ? `R$ ${formData.reserva}` : '-'}</span>
                </Text>
            </div>
        </div>
    );
}