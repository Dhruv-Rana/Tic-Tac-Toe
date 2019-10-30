import os

Board=[[1,2,3],[4,5,6],[7,8,9]]

def reset():
    
    global Board    
    Board=[[1,2,3],[4,5,6],[7,8,9]]

def count(choice):
    
    m1=m2=m3=m4=0
    
    for i in range(0,3):
        c1=c2=0
        
        if Board[i][i]==choice:
            m3+=1
        if Board[i][2-i]==choice:
            m4+=1
            
        for j in range(0,3):
            if Board[i][j]==choice:
                c1+=1
            if Board[j][i]==choice:
                c2+=1
                
        if c1>m1:
            m1=c1
        if c2>m2:
            m2=c2
    
    return max([m1,m2,m3,m4])

def display():
    
    for i in range(0,3):
        for j in range(0,3):
            print(Board[i][j],end=" ")
        print("\n")

def change(x,s):
    
    flag=False
    
    for i in range(0,3):
        for j in range(0,3):
            if Board[i][j]==x:
                if s%2==0:
                    Board[i][j]="X"
                    flag=True
                    break
                else:
                    Board[i][j]="O"
                    flag=True
                    break
        if flag:
            break

def game():
    
    os.system('cls')
    print("HOLA!!!\n\nLet's play TIC TAC TOE!!")
    print("You just need to enter a number from 1 to 9 considering their position on the board\n")
    
    f1=False
    
    for i in range(0,9):
        
        if i>0:
            os.system('cls')
        display()
        if i%2==0:
            print("Player 1 take your turn: ",end="")
        else:
            print("Player 2 take your turn: ",end="")
        x=int(input())
        print("\n")

        if x>=1 and x<=9:
            change(x,i)
            if i%2==0:
                if count('X')==3:
                    os.system('cls')
                    print("Player 1, you won!!!\n")
                    display()
                    f1=True
                    break
            else:
                if count('O')==3:
                    os.system('cls')
                    print("Player 2, you won!!!\n")
                    display()
                    f1=True
                    break
        if i==8:
            display()

    if not f1:
        os.system('cls')
        print("It's a tie!!\n")
        display()
        
    print("Wanna try again??\nEnter your choice: Yes/yes or No/no ?")
    selection=input()
    
    if selection=="Yes" or selection=="yes":
        reset()
        game()
        
    else:

        #os.system('cls')
        print("\nOK Thanks !!Hope you enjoyed it\n\n")


game()