import Button from "./Button";
import QuestionIcon from "../assets/icons/question.svg?react";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "./Modal";

export interface VehicleFormData {
    diasTrabalhados: number;
    consumo: number;
    precoGasolina: number;
    manutencaoValor: number;
    manutencaoKm: number;
    pneusValor: number;
    pneusKm: number;
    ipva: number;
    licenciamento: number;
    seguro: number;
    parcela: number;
    reserva: number;
}

const emptyFormData: VehicleFormData = {
    diasTrabalhados: 0,
    consumo: 0,
    precoGasolina: 0,
    manutencaoValor: 0,
    manutencaoKm: 0,
    pneusValor: 0,
    pneusKm: 0,
    ipva: 0,
    licenciamento: 0,
    seguro: 0,
    parcela: 0,
    reserva: 0,
};

export default function VehicleForm() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<VehicleFormData>();
    const navigate = useNavigate();
    const [modal, setModal] = useState({
        isVisible: false,
        message: '',
    });
    const [helpText, setHelpText] = useState<string | null>(null);
    const [showEditButton, setShowEditButton] = useState<boolean>(false);

    function onSubmit(data: VehicleFormData) {
        try {
            const dataString = JSON.stringify(data)

            localStorage.setItem('vehicleFormData', dataString);

            setModal({
                isVisible: true,
                message: 'Dados salvos com sucesso! Redirecionando...',
            });

            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            console.error('Erro ao salvar os dados no localStorage:', error);
            setModal({
                isVisible: true,
                message: 'Ocorreu um erro ao salvar os dados.',
            });
        }
    }

    function handleClear() {
        reset(emptyFormData);
    }

    function handleEditForm() {
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

                reset(formattedData);
            } catch (error) {
                console.error('Erro ao fazer o parse dos dados do localStorage:', error);
            }
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem('vehicleFormData');

        if (storedData) {
            setShowEditButton(true)

        }
    }, []);

    return (
        <form className="bg-blue-100 p-4 rounded-lg max-w-md w-full text-white flex justify-center" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-center w-full">
                <div className="flex flex-col gap-2 w-full md:w-80">
                    <label htmlFor="diasTrabalhados" className="flex items-center gap-2">
                        Dias trabalhados no mês<span className="text-red-100 text-sm ">*</span>
                        <button type="button" onClick={() => setHelpText('Informe o total de dias que você irá trabalhar neste mês para calcular seus ganhos e descontos de forma precisa.')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>
                    <input
                        id="diasTrabalhados"
                        {...register('diasTrabalhados', { required: true })}
                        placeholder="Total em dias"
                        className={`bg-white px-2 p-0.5 rounded text-black w-full md:w-80 
                    ${errors.diasTrabalhados ? 'border-red-500' : 'border-gray-300'}`} />
                    {errors.diasTrabalhados &&
                        <span className="text-red-100 text-sm ">Este campo é obrigatório.</span>}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-80">
                    <label htmlFor="consumoVeiculo" className="flex items-center gap-2 mt-2">
                        Consumo do Veículo<span className="text-red-100 text-sm ">*</span>
                        <button type="button" onClick={() => setHelpText('Informe o consumo médio do seu veículo em quilômetros por litro (km/L).')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>
                    <input
                        id="consumoVeiculo"
                        type="number"
                        placeholder="KM por Litro"
                        className={`bg-white px-2 p-0.5 rounded text-black w-full md:w-80 ${errors.consumo ? 'border-red-500' : 'border-gray-300'}`}
                        step="0.01"
                        {...register('consumo', { required: true })}
                    />
                    {errors.consumo && <span className="text-red-100 text-sm">Este campo é obrigatório.</span>}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-80">
                    <label htmlFor="precoGasolina" className="flex items-center gap-2 mt-2">
                        Preço da Gasolina<span className="text-red-100 text-sm ">*</span>
                        <button type="button" onClick={() => setHelpText('Informe o preço atual pago por cada litro de gasolina.')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>

                    <input
                        id="precoGasolina"
                        type="number"
                        placeholder="R$/Litro"
                        className={`bg-white px-2 p-0.5 rounded text-black w-full md:w-80 ${errors.precoGasolina ? 'border-red-500' : 'border-gray-300'}`}
                        step="0.01"
                        {...register('precoGasolina', { required: true })}
                    />
                    {errors.precoGasolina && <span className="text-red-100 text-sm">Este campo é obrigatório.</span>}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-80">
                    <label htmlFor="manutencao" className="flex items-center gap-2 mt-2">
                        Manutenção
                        <button type="button" onClick={() => setHelpText('Informe o custo da manutenção e a frequência em que ela é feita. Exemplo: A troca de óleo custa R$ 300 a cada 10.000 KM.')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>
                    <div className="flex flex-row md:flex-row gap-2 md:gap-3 w-full md:w-80">
                        <input
                            id="manutencao-valor"
                            type="number"
                            placeholder="R$"
                            className="bg-white px-2 p-0.5 rounded text-black border-gray-300 w-full md:w-1/2"
                            step="0.01"
                            {...register('manutencaoValor')}
                        />
                        <input
                            id="manutencao-km"
                            type="text"
                            placeholder="KM"
                            className="bg-white px-2 p-0.5 rounded text-black border-gray-300 w-full md:w-1/2"
                            {...register('manutencaoKm', {
                                setValueAs: value => {
                                    if (!value) return 0;
                                    const cleanValue = String(value).replace(/[.,]/g, '');
                                    return Number(cleanValue);
                                }
                            })}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-80">
                    <label htmlFor="pneus" className="flex items-center gap-2 mt-2">
                        Pneus
                        <button type="button" onClick={() => setHelpText('Informe o preço total do kit de pneus e a média de quilometragem que eles duram.')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>
                    <div className="flex flex-row md:flex-row gap-2 md:gap-3 w-full md:w-80">
                        <input
                            id="pneus-valor"
                            type="number"
                            placeholder="R$"
                            className="bg-white px-2 p-0.5 rounded text-black border-gray-300 w-full md:w-1/2"
                            step="0.01"
                            {...register('pneusValor')}
                        />
                        <input
                            id="pneus-km"
                            type="number"
                            placeholder="KM"
                            className="bg-white px-2 p-0.5 rounded text-black border-gray-300 w-full md:w-1/2"
                            {...register('pneusKm', {
                                setValueAs: value => {
                                    if (!value) return 0;
                                    const cleanValue = String(value).replace(/[.,]/g, '');
                                    return Number(cleanValue);
                                }
                            })}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-80" >
                    <label htmlFor="ipva" className="flex items-center gap-2 mt-2">
                        IPVA
                        <button type="button" onClick={() => setHelpText('Informe o valor total do IPVA por ano. Este custo será rateado mensalmente no cálculo das suas despesas.')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>
                    <input
                        id="ipva"
                        type="number"
                        placeholder="R$"
                        className="bg-white px-2 p-0.5 rounded text-black border-gray-300 w-full md:w-80"
                        step="0.01"
                        {...register('ipva')}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full md:w-80">
                    <label htmlFor="licenciamento" className="flex items-center gap-2 mt-2">
                        Licenciamento
                        <button type="button" onClick={() => setHelpText('Informe o valor pago anualmente pelo Licenciamento do seu veículo. Esse custo será dividido para calcular sua despesa diária.')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>

                    <input
                        id="licenciamento"
                        type="number"
                        placeholder="R$"
                        className="bg-white px-2 p-0.5 rounded text-black border-gray-300 w-full md:w-80"
                        step="0.01"
                        {...register('licenciamento')}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full md:w-80">
                    <label htmlFor="seguro" className="flex items-center gap-2 mt-2">
                        Seguro
                        <button type="button" onClick={() => setHelpText('Informe o valor total que você paga por ano pelo seguro do seu veículo. Esse custo será dividido mensalmente para um cálculo mais preciso das suas despesas.')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>
                    <input
                        id="seguro"
                        type="number"
                        placeholder="R$"
                        className="bg-white px-2 p-0.5 rounded text-black border-gray-300 w-full md:w-80"
                        step="0.01"
                        {...register('seguro')}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full md:w-80">
                    <label htmlFor="parcela" className="flex items-center gap-2 mt-2">
                        Valor da Parcela do Veículo
                        <button type="button" onClick={() => setHelpText('Informe o valor mensal gasto com o pagamento do veículo')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>
                    <input
                        id="parcela"
                        type="number"
                        placeholder="R$"
                        className="bg-white px-2 p-0.5 rounded text-black border-gray-300 w-full md:w-80"
                        step="0.01"
                        {...register('parcela')}
                    />
                </div>

                <div className="flex flex-col gap-2 w-full md:w-80">
                    <label htmlFor="reserva" className="flex items-center gap-2 mt-2">
                        Reserva de Emergência
                        <button type="button" onClick={() => setHelpText('Informe o valor mensal que você deseja destinar para a sua reserva de emergência.')}>
                            <QuestionIcon className="fill-white" />
                        </button>
                    </label>
                    <input
                        id="reserva"
                        type="number"
                        placeholder="R$"
                        className="bg-white px-2 p-0.5 rounded text-black border-gray-300 w-full md:w-80"
                        step="0.01"
                        {...register('reserva')}
                    />
                </div>
                <Modal isVisible={modal.isVisible} message={modal.message} />
                <Modal
                    isVisible={!!helpText}
                    message={helpText || ''}
                    onClose={() => setHelpText(null)}
                />

                <div className="flex md:flex-row w-full md:w-80 gap-2 mt-5">
                    <Button variant={"secondary"} size={"lg"} className="w-full" onClick={handleClear} type="button">Limpar</Button>
                    {showEditButton && <Button variant={"terciary"} size={"lg"} className="w-full" type="button" onClick={handleEditForm}>Editar</Button>}
                    <Button size={"lg"} className="w-full" type="submit">Salvar</Button>
                </div>
            </div>
        </form >
    );
}