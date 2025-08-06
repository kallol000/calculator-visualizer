// This function returns the relative precedance of the operators we have
// e.g divide (/) has higher precedance than multiply (*)
function precedence (c:string):number {
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
function isOperand (c:string) {
	if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9')) {
		return 1;
	}
	return 0;
}

//Function for converting a infix expression to postfix expression
export function infixToPostfix (s:string, st:string[]) {
    // const st:string[] = []; 
    let postFix = "";

    for (let i = 0; i < s.length; i++) {
        if (isOperand(s[i])) {
            postFix += s[i];
        }
        else if (s[i] == '(') {
            st.push('(');
        }
        else if (s[i] == ')') {
            while (st[st.length - 1] != '(') {
                postFix += st[st.length - 1];
                st.pop();
            }
            st.pop();
        }
        else {
            while (st.length != 0 && precedence(s[i]) <= precedence(st[st.length - 1])) {
                postFix += st[st.length - 1];
                st.pop();
            }
            st.push(s[i]);
        }
    }

    while (st.length != 0) {
        postFix += st[st.length - 1];
        st.pop();
    }

    return postFix
}