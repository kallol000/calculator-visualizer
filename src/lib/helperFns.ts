// This function returns the relative precedance of the operators we have
// e.g divide (/) has higher precedance than multiply (*)
export function precedence (c:string):number {
    if (c == '^') {
        return 3;
    }
    else if (c == '/' || c == '*') {
        return 2;
    }
    else if (c == '+' || c == '-') {
        return 1;
    }
    else {
        return 0;
    }
}

//Function check whether the given character is Operand or not
export function isOperand (c:string) {
	if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
		return 1;
	}
	return 0;
}

//Function for converting a infix expression to postfix expression
export function infixToPostfix (s:string) {
    const stack:string[] = []; 
    let postFix = "";

    for (let i = 0; i < s.length; i++) {
        if (isOperand(s[i])) {
            postFix += s[i];
        }
        else if (s[i] == '(') {
            stack.push('(');
        }
        else if (s[i] == ')') {
            while (stack[stack.length - 1] != '(') {
                postFix += stack[stack.length - 1];
                stack.pop();
            }
            stack.pop();
        }
        else {
            while (stack.length != 0 && precedence(s[i]) <= precedence(stack[stack.length - 1])) {
                postFix += stack[stack.length - 1];
                stack.pop();
            }
            stack.push(s[i]);
        }
    }

    while (stack.length != 0) {
        postFix += stack[stack.length - 1];
        stack.pop();
    }

    return postFix
}