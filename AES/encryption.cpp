#include <iostream>
#include <iomanip>
#include <bitset>
#include <openssl/rand.h>
#include <array>
#include <cmath>

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

int main() {
    int bytesIDLenght = keyLenght/8; 
    unsigned char key[bytesIDLenght];
    if (generateID(key,bytesIDLenght)!=0){
        return 1;
    }
    unsigned char rcon[10][4];
    return 0;
}
