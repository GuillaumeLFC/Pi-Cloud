#include <iostream>
#include <iomanip>
#include <bitset>
#include <openssl/rand.h>
#include <array>

using namespace std;

const int keyLenght = 128;
const int numberRounds = 10;
const size_t numberRoundKeys = numberRounds+1;

int generateID(unsigned char* buffer, int bufferSize) {
    if (RAND_bytes(buffer, bufferSize) != 1) {
        std::cerr << "Error in RAND_bytes" << std::endl;
        return 1;
    }
    cout << "Premiere key générée : ";
    for (int i = 0; i < bufferSize; ++i){
       std::cout << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(buffer[i]);
    }
      std::cout << std::dec << std::endl;
    return 0;
}

/*Sépare une clef en des "word" de 32 bits.
*/
unsigned char* SplitInto32bitWords (unsigned char* key, int numberwords){
    unsigned char words[numberwords];
    for (int i =0 ; i < numberwords ; ++i ){
        words[i] = (static_cast<uint32_t>(key[i * 4]) << 24) |
                    (static_cast<uint32_t>(key[i * 4 + 1]) << 16) |
                    (static_cast<uint32_t>(key[i * 4 + 2]) << 8) |
                    static_cast<uint32_t>(key[i * 4 + 3]);
    }
    return words;
}

int initWithOriginalKey32bitsWords(unsigned char key[][4],unsigned char *originalKey, int numberWords){
    for (int i =0; i < numberWords; ++i){
        key[0][i] = originalKey[i];
    }
    return 0;
}

unsigned char* KeyExpansion(unsigned char* originalID){ 
    int Number32bitWords = keyLenght/32;

    unsigned char keys[numberRoundKeys][Number32bitWords];
    initWithOriginalKey32bitsWords(keys,originalID,Number32bitWords);
    
    for (int i = 1; i < numberRoundKeys; ++i){
        for (int j = 0; j < Number32bitWords; ++j){
            if (i%Number32bitWords == 0){
                keys[i][j] = keys[i-1][j] | 
            }
        }
    }
}

int main() {
    int bytesIDLenght = keyLenght/8; 
    unsigned char key[bytesIDLenght];
    if (generateID(key,bytesIDLenght)!=0){
        return 1;
    }
    return 0;
}
