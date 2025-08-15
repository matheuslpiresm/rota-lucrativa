import Container from "../components/Container";
import VehicleForm from "../components/VehicleForm";
import Text from "../components/Text";
import QuestionIcon from "../assets/icons/question.svg?react";
import SettingsCard from "../components/SettingsCard";
import { useState } from "react";
import Modal from "../components/Modal";

export default function Settings() {
    const [helpText, setHelpText] = useState<string | null>(null);

    return (
        <Container>
            <Text variant="body-md-bold" className="flex items-center gap-2">
                Configurações

                <button type="button" onClick={() => setHelpText('Todos os campos marcados com * são de preenchimento obrigatório.')}>
                    <QuestionIcon />
                </button>

            </Text>
            <div className="flex gap-4">
                <VehicleForm />
                <div className="hidden md:block">
                    <SettingsCard />
                </div>
            </div>

            <Modal
                isVisible={!!helpText}
                message={helpText || ''}
                onClose={() => setHelpText(null)}
            />
        </Container >

    )
}