import { writeFile, readFile } from 'fs';
import { resolve } from 'path';

const ARQUIVO_DE_FILA = `${resolve('.')}/files/fila.txt`;

/**
 * Os métodos escritos abaixo implementam uma fila de mensagens escritas em
 * arquivo de texto, presente na pasta "files". A cada mensagem escrita nesta fila,
 * (através do método `escreveNaFila`) o código escreve a frase ao final do arquivo.
 * O método `consumirDafila` retira a primeira mensagem escrita no arquivo e a retorna.
 *
 * As funções abaixo estão todas escritas utilizando callbacks como soluções
 * para a manipulação dos arquvos.
 *
 * Tranforme a solução escrita abaixo em um código válido utilizando promises ou
 * async/await.
 */

export async function zerarAquivo(): Promise<void> {
  await escreveArquivo('');
}

export async function leArquivo(): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(ARQUIVO_DE_FILA, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } 
      
      resolve(data);
    });
  });
}

export async function escreveArquivo(texto: string): Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile(ARQUIVO_DE_FILA, texto, (err) => {
      if (err) {
        reject(err);
      } 
      
      resolve();
    });
  });
}

export async function escreveNaFila(texto: string): Promise<void> {
  const fila = await leArquivo();
  await escreveArquivo(!fila ? texto : `${fila}\n${texto}`);
}

export async function consumirDaFila(): Promise<string> {
  const fila = await leArquivo();
  const [primeiraLinha] = fila.split('\n');
  await escreveArquivo(fila.indexOf('\n') === -1 ? fila.replace(`${primeiraLinha}`, '') : fila.replace(`${primeiraLinha}\n`, ''));
  return primeiraLinha;
}
