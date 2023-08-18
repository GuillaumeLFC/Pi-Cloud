#include <iostream>
#include <iomanip>
#include <bitset>
#include <openssl/rand.h>
#include <array>

using namespace std;

const int keyLenght = 128;
const int numberRounds = 10;
const size_t numberRoundKeys = numberRounds+1;

int generateKey(unsigned char* Key, int KeyLenght);

int main() {
    int bytesIDLenght = keyLenght/8; 
    unsigned char key[bytesIDLenght];
    if (generateKey(key,bytesIDLenght)!=0) {return 1;}
    return 0;
}

int generateKey(unsigned char* Key, int KeyLenght) {
    if (RAND_bytes(Key, KeyLenght) != 1) {
        cout << "Error in RAND_bytes" << endl;
        return 1;
    }
    cout << "Premiere key générée : ";
    for (int i = 0; i < KeyLenght; ++i){
    std::cout << std::hex << std::setw(2) << std::setfill('0') << static_cast<int>(Key[i]);
    }
    std::cout << std::dec << std::endl;
    return 0;
}
