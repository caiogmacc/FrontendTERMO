import React, { useState } from 'react';
import useBuscarDados from './words'; // Ajuste o caminho conforme necessário

const ComponenteBusca = () => {
    const [palavra, setPalavra] = useState('');
    const { resultado, loading, error } = useBuscarDados(palavra);

    const handleInputChange = (e) => {
        setPalavra(e.target.value);
    };

    const handleBuscar = () => {
        setPalavra(palavra); // Atualiza a palavra e aciona a busca
    };

    return (
        <div>
            <input
                type="text"
                value={palavra}
                onChange={handleInputChange}
                placeholder="Digite uma palavra"
            />
            <button onClick={handleBuscar}>Buscar</button>

            {loading && <p>Carregando...</p>}
            {error && <p>Erro: {error.message}</p>}
            {resultado && <pre>{JSON.stringify(resultado, null, 2)}</pre>}
        </div>
    );
};

export default ComponenteBusca;
