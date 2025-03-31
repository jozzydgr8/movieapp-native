import { registerRootComponent } from 'expo';
import App from './App';
import { ContextData } from './contxt/ContextData';

export default function Main() {
    return (
        <ContextData>
            <App />
        </ContextData>
    );
}

registerRootComponent(Main);
