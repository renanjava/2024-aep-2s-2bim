# @Copyright
# Created by : CompuSalle
# Waseem Adel Alaa-Iddin
# Can be used in your project. A name maintaining will be nice.
# >> >> >> Ethical Use Only! << << << 

import itertools
import string
import re
import time

User_Password = ''

Run_The_Server = 1


#function to brute-force user pass (real is the variable that passes in the function)
def guess_password(real):
    pass_gen = string.ascii_lowercase + string.digits 
    attempts = 0
    show_out = input('Do you want to see output ? Will slow down the prosses.. (y/N) >>  ').lower() #to make inputs lowercase
    start_time = time.time()

    #start a loop that has a range of 1 to 7.
    for password_length in range(1, 7):
        
        #if show attempts 
        if show_out == 'y':
            #to genertae the pass in range of  1 to 6 ...example : MIN as (0 or a) , Max as (999999 or zzzzzz) 
            for guess in itertools.product(pass_gen, repeat=password_length):  # itertools.product works as >> start,  start + one step, , start + 2 step... so on
                #to count the attempts
                attempts += 1
                guess = ''.join(guess) #each guess result will be in a separate string to make the guess 100% accurate
                #if found the pass
                if guess == real:
                    #time to find the pass
                    print("\n\nThe Pass has been found in ---- %s seconds ----" % (time.time() - start_time)) 
                    #return the pass and the number of attempts to find it
                    return '\npassword is {}. found in {} guesses.'.format(guess, attempts)
                #show all attempts
                print(f'Pass : {guess} | number of attempts :  {attempts}')
        # do not show attempts       
        elif show_out == 'n':
            for guess in itertools.product(pass_gen, repeat=password_length):
                attempts += 1
                guess = ''.join(guess)
                #if found the pass
                if guess == real:
                    print("\n\nThe Pass has been found in ---- %s seconds ----" % (time.time() - start_time)) 
                    return '\npassword is {}. found in {} guesses.'.format(guess, attempts)
        #if any error          
        else:
            print('[+] Error')
            break


while Run_The_Server == 1:
    WhichTask = input("[+] Do You Want To Start [A] or [B] ? :  ").lower() #to make inputs lowercase
    #to start task A
    if WhichTask == 'a': 
        Run_The_Server = 0
        while User_Password != "StopTheProgramNow!!!":
            User_Password = str(input("\n\n[+] Please Enter a password\n... max 6 length - numbers lowercase only (uppercase will be converted to lowercase automatically) \n>> ")).lower()
            
            #setting the pass as string 
            string_set = set(User_Password)
            punctuation_set = set(string.punctuation)
            
            #if space in user input
            if re.search(r'[\s]', User_Password): 
                    print("\n[!] No Spaces Betwen character please \n")
                    time.sleep(1)
                    continue 
            
            #if special in character user input
            elif string_set.intersection(punctuation_set): 
                print("\n[!] No special character")
                time.sleep(1)
                continue

            #if pass length is  > 6
            elif len(User_Password) > 6:  
                print('\n[!] The Pass max length is 6...')
                time.sleep(1)
                continue

            #if pass input is null
            elif User_Password == '':  
                print('\n[!] Pass is Null..!')
                time.sleep(1)
                continue

            else:
                print('\n[+] Starting ... \n')
                time.sleep(1)
                #to run this function 
                print(guess_password(User_Password)) 
                print("________")
                break

    #to start task B
    elif WhichTask == 'b':
        Run_The_Server = 0
        while User_Password != "StopTheProgramNow!!!":
            print('\n[!] You can remove this part or add whatever you want!\n')
            break

    else:
        print('\n[!] Chosee Only [A] or [B]')
        continue