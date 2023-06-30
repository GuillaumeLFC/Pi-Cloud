#include <iostream>
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
    return 0;
}

array<unsigned char,numberRoundKeys> KeyExpansion(unsigned char* originalID){ 
    array<unsigned char, numberRoundKeys> keys;
    int number32bitWords = keyLenght/32;
    uint32_t words[number32bitWords];
}

/*Sépare une clef en des "word" de 32 bits.
*/
int SplitInto32bitWords (unsigned char* input, array<uint32_t,keyLenght/32>* output){
    for (int i =0 ;i < (keyLenght/32)-1; ++i){
        words[i] = ()
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
