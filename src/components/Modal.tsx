import Button from './Button';
import Text from './Text';

interface ModalProps {
    isVisible: boolean;
    message: React.ReactNode;
    onClose?: () => void;
}

export default function Modal({ isVisible, message, onClose }: ModalProps) {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-fundo flex items-center justify-center z-50">
            <div
                className="bg-white p-6 md:p-8 rounded-lg text-center max-w-sm mx-4 flex flex-col items-center justify-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                <Text variant={'body-md-bold'}>{message}</Text>

                <Button variant={'secondary'} size={'lg'} onClick={onClose}>
                    Fechar
                </Button>
            </div>
        </div>
    );
}