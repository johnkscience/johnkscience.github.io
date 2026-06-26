/* ΒΑΣΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ ΠΑΡΑΘΥΡΩΝ
*  Δεν έχουν εξαρτηση
*  Τελευταία ενημέρωση 31-8-2024
*  Τεκμηρίωση: johnkscienceLibrary006
*  Κουμουνδούρος Γιάννης
*/

/* *****************************************************************
   **                  ΣΥΝΑΡΤΗΣΕΙΣ ΜΑΘΗΜΑΤΙΚΩΝ                    **
   ***************************************************************** */

/*Ο χαρακτήρας της κλασματικής γραμμής*/
//const _FRAC_CHAR='⌞';
const _FRAC_CHAR='_';

/*Ο χαρακτήρας του εκθετικού σε αριθμούς σε παραστάσεις με κλάσματα*/
const _EXP_CHAR='e';

/*Ο χαρακτήρας του εκθετικού σε αριθμούς σε επιστημονική σημειογραφία*/
const _EXP2_CHAR='E';

const _IMG_REC_CHAR='&';
//const _IMG_POL_CHAR='∠';

const _MATH_PI='3.141592653589793238462643383279502884197';

const _APPROX_TO_ZERO=1e-155;

const _PRECISION=10;



/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%        ΑΛΦΑΡΗΘΜΙΤΙΚΑ (STRINGS)       %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Διαγράφει από έναν αριθμό (δεκαδικό) όλα τα περιττά μηδενικά*/
function johnkscienceStringDeleteTrailingZeros(str){
  //Διαγράφει όλους τους τελευταίους χαρακτήρες του res που 
  //είναι ίδιοι με τον delChar.
  //Οι παραπάνω διαγραφές γίνονται εφόσον μέσα στο αλφαριθμητικό
  //υπάρχει ο χαρακτήρας whileChar.
  //Όταν σβήσει όλους τους τελευταίους χαρακτήρες που είναι 
  //ίδιοι με τον delChar, σβήνει ακόμα έναν χαρακτήρα  που είναι
  //ίδιος με τον endChar.
  
  //π.χ. αν delChar='0' και whileChar='.' και endChar='.' τότε
  //20.00000--> 20
  //2030000 --> 2030000
	
	let delChar='0';
	let whileChar='.';
	let endChar='.';
	
	let res=str;
	let flag=true;
	
	//Σβήνει όλους τους τελευταίους χαρακτήρες του res 
	//που είναι ίδοι με τον delChar
	while(res.length>0 && res.indexOf(whileChar)>=0){
		if(res.lastIndexOf(delChar)==res.length-1){
			res=res.slice(0,res.length-1);
		}else{
			break;
		}
	}
	
	//Σβήνει μόνο μία φορά εάν υπάρχει τον τελευταίο χαρακτήρας
	//του res που είναι ένας από αυτούς που βρίκονται στον πίνακα
	//endChar
	if(res.lastIndexOf(endChar) == res.length-1){
		res=res.slice(0,res.length-1);
	}

	return res;
}

/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%     ΣΥΝΤΑΚΤΙΚΗ ΑΝΑΛΥΣΗ (SYNTAX)      %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Η συνάρτηση αυτή ελέγχει εάν ο αριθμός είναι κινητής υποδιαστολής
  μπορεί να είναι δεκαδικός ή ακέραιος
  π.χ.	
	
		0, 1, -1, 0.45, 1.45, 34.45 κτλ
		0e3, 34e-4, 45e+3, 0.45e4, -45.56e-4 κτλ

  εξαιρέσεις:
  
		00, .45, e-4, 00.56, 2Ε-4 κτλ
  
*/
function johnkscienceSyntaxIsNumber(num){
	return /^[+-]?(0|[1-9]\d*)([.,]\d*)?(e[+-]?\d+)?$/.test(''+num);
	}

/*Η συνάρτηση αυτή ελέγχει εάν ο αριθμός είναι ακέραιος
	
	π.χ.	
	
		0, 1, -1, 0.45e5, 1.45e+2, -34.45e2, 200e-1 κτλ
  
*/
function johnkscienceSyntaxIsInteger(num){
	if(johnkscienceSyntaxIsNumber(''+num) && Number.isInteger(num-0)){
		return true;
	}else{
		return false;
	}
}

/*Η συνάρτηση αυτή ελέγχει εάν ο αριθμός είναι κλάσμα

		ΚΛΑΣΜΑ ή
		ΑΚΕΡΑΙΟΣ ή
		ΑΚΕΡΑΙΟΣ_ΑΚΕΡΑΙΟΣ
	
  π.χ.	
	
		0, 1, -1, 0.45e5, 1.45e+2, -34.45e2, 200e-1 κτλ
		2_3, -4_-5, 4e3_500e-1 κτλ
		
  επίσης οι παρακάτω αριθμοί είναι κλάσματα
  
		2_ που ισοδυναμεί με τον 2_1
		_2 που ισοδυναμεί με τον 1_2
		0_0 και 1_0
  
*/
function johnkscienceSyntaxIsFraction(num){
	let n=johnkscienceMathFractionNumerator(num);
	let d=johnkscienceMathFractionDenumerator(num);
	
	if(johnkscienceSyntaxIsInteger(n) && johnkscienceSyntaxIsInteger(d)){
		return true;
	}else{
		return false;
	}
}

/*Η συνάρτηση αυτή ελέγχει εάν ο αριθμός είναι ΕΠΙΣΤΗΜΟΝΙΚΟΣ 
	
		ΕΠΙΣΤΗΜΟΝΙΚΟΣ ή
		ΚΛΑΣΜΑ Ε+- ΑΚΕΡΑΙΟΣ ή
		ΑΡΙΘΜΟΣ
	
  π.χ.	
	
		0, 1, -1, 0.45e5, 1.45e+2, -34.45e2, 200e-1 κτλ
		2_3, -4_-5, 4e3_500e-1 κτλ
		0E0, 2E-3, 2e4E5, κτλ
		
  επίσης οι παρακάτω αριθμοί είναι ΕΠΙΣΤΗΜΟΝΙΚΟΣ
  
		2_ που ισοδυναμεί με τον 2_1
		_2 που ισοδυναμεί με τον 1_2
		0_0 και 1_0
		'' που ισοδυναμεί με τον '0'
  
*/
function johnkscienceSyntaxIsScientific(num){
	let m=johnkscienceMathScientificMantissa(num);
	let e=johnkscienceMathScientificExponent(num);
	
	if(johnkscienceSyntaxIsInteger(e) && 
		(johnkscienceSyntaxIsNumber(m) || johnkscienceSyntaxIsFraction(m))){
		return true;
	}else{
		return false;
	}
	
}

/*Η συνάρτηση αυτή ελέγχει εάν ο αριθμός είναι ΜΙΓΑΔΙΚΟΣ 

		ΜΙΓΑΔΙΚΟΣ ή
		ΚΛΑΣΜΑ ή
		ΕΠΙΣΤΗΜΟΝΙΚΟΣ ή
		ΕΠΙΣΤΗΜΟΝΙΚΗ & ΕΠΙΣΤΗΜΟΝΙΚΟΣ
	
  π.χ.	
	
		0, 1, -1, 0.45e5, 1.45e+2, -34.45e2, 200e-1 κτλ
		2_3, -4_-5, 4e3_500e-1 κτλ
		0E0, 2E-3, 2e4E5, κτλ
		3&4, -3&4, 3e3_5&3_6, 3e3_5E4&3_6E5 
		
  επίσης οι παρακάτω αριθμοί είναι κλάσματα
  
		2_ που ισοδυναμεί με τον 2_1
		_2 που ισοδυναμεί με τον 1_2
		0_0 και 1_0
		'' που ισοδυναμεί με τον '0'
  
*/
function johnkscienceSyntaxIsComplex(num){
	let r=johnkscienceMathComplexRecReal(num);
	let i=johnkscienceMathComplexRecImg(num);
	
	if(johnkscienceSyntaxIsScientific(r) && johnkscienceSyntaxIsScientific(i)){
		return true;
	}else{
		return false;
	}
}

/*Επιστρέφει true εάν δεν είναι αριθμός, κλάσμα, επιστημονικός ή μιγαδικός*/
function johnkscienceSyntaxIsNaN(num){
	if(johnkscienceSyntaxIsComplex(num) | johnkscienceSyntaxIsScientific(num) | johnkscienceSyntaxIsFraction(num) | johnkscienceSyntaxIsNumber(num)){
		return false;
	}else{
		return true;
	}
}


/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%        ΜΑΘΗΜΑΤΙΚΑ ΓΕΝΙΚΑ (MATH)      %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Υπολογίζει το ΜΚΔ (N)->N
  
  NUMBER johnkscienceMathGcd(NUMBER, NUMBER)

*/
function johnkscienceMathGcd(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

/*Υπολογίζει το ΕΚΠ (N)->N
  
  NUMBER johnkscienceMathLcm(NUMBER, NUMBER)

*/
function johnkscienceMathLcm(a, b) {
        return (a * b) / johnkscienceMathGcd(a, b);   
    } 

/* Επιστρέφει true εάν το όρισμα είναι '', undefined ή null */
function johnkscienceMathIsEmpty(num){
	if(num==='' || num===undefined || num===null) return true;
	return false;
}

/*Επιστρέφει το παραγοντικό*/
function johnkscienceMathFactorialize(num) {
  var result = num;
  if (num === 0 || num === 1) 
    return 1; 
  while (num > 1) { 
    num--;
    result *= num;
  }
  return result;
}

/*Επιστρέφει το ημίτονο μίας γωνίας σε rad*/
function johnkscienceMathSin(rad){
	if(Math.abs(rad)==0 || Math.abs(rad)==Math.PI || Math.abs(rad)==2*Math.PI) return 0;
	if(rad==Math.PI/2 || rad==-3*Math.PI/2) return 1;
	if(rad==3*Math.PI/2 || rad==-Math.PI/2) return -1;
	
	return Math.sin(rad);
}

/*Επιστρέφει το συνημίτονο μίας γωνίας σε rad*/
function johnkscienceMathCos(rad){
	
	if(Math.abs(rad)==Math.PI/2 || Math.abs(rad)==3*Math.PI/2) return 0;
	if(Math.abs(rad)==0 || Math.abs(rad)==2*Math.PI) return 1;
	if(Math.abs(rad)==Math.PI) return -1;
	
	return Math.cos(rad);
}

/*Επιστρέφει την αντίστροφη εφαπτομένη, δεδομένων των καρτεσιανών
  συντεταγμένων x και y
*/
function johnkscienceMathAtan2(y, x){
		return Math.atan2(y,x);
			
}



/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%     ΚΛΑΣΜΑΤΑ (FRACTIONS)             %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Οι παρακάτω συναρτήσεις χαμηλού επιπέδου χειρίζονται 
  αλφαριθμητικά που περιέχουν κλάσματα. Αυτά τα κλάσματα 
  είναι στην μορφή "α_β". Όπου α είναι ο αριθμητής, β ο
  παρανομαστής και _ είναι ο χαρακτήρας της κλασματικής 
  γραμμής. Ο χαρακτήρας αυτός ορίζεται από την σταθερά 
  _FRAC_CHAR. Τα α και β πρέπει να είναι ακέραιοι. Αυτές
  οι συναρτήσεις δεν κάνουν έλεγχο λαθών. Δεν γίνεται 
  έλεγχος για μηδενικό παρανομαστή ή απροσδιόριστη μορφή, 
  σε αυτές τις περιπτώσεις μπορεί να προκύψει άπειρη επανάληψη
  
  Ένα κλάσμα είναι στην μορφή INTEGER_INTEGER ή INTEGER
  
  π.χ.  0, 1, -1, 2_3, -2_3, 2_-3, -2_-3
		2e+3, 2e3, 200e-1,
		2e3_5, 2_5e+2, 2e+3_5e+2 
		e3, 2_e3
  
  Ακόμα το '' αντιστοιχεί στον αριθμό 0
        το _3 στον 1_3 και 
		το 2_ στον 2_1
  
  */

/*Επιστρέφει τον αριθμητή του κλάσματος (S)->S
	
  STRING johnkscienceMathFractionNumerator( STRING )
	
	*/
function johnkscienceMathFractionNumerator(num){
	if(num=='') return '0';
	if(num.indexOf(_FRAC_CHAR)<0){
		return num;
	}else{
		let n=num.split(_FRAC_CHAR)[0];
		if(n==''){
			return '0';
		}else{
			return n;
		}
	}
}

/*Επιστρέφει τον παρανομαστή του κλάσματος (S)->S
	
  STRING johnkscienceMathFractionDenumerator( STRING )
	
	*/
function johnkscienceMathFractionDenumerator(num){
	if(num=='') return '1'; 
	if(num.indexOf(_FRAC_CHAR)<0){
		return '1';
	}else{
		let n=num.split(_FRAC_CHAR)[1];
		if(n==''){
			return '1';
		}else{
			return n;
		}
	}
}

/*προσθέτει δύο κλάσματα (S, S)->S
  
  STRING johnkscienceMathFractionAdd(STRING, STRING)

*/
function johnkscienceMathFractionAdd(lhs, rhs){
	
	let num1=Number(johnkscienceMathFractionNumerator(lhs));
	let den1=Number(johnkscienceMathFractionDenumerator(lhs));
	let num2=Number(johnkscienceMathFractionNumerator(rhs));
	let den2=Number(johnkscienceMathFractionDenumerator(rhs));
	
	//Υπολογίζει το ΕΚΠ των παρανομαστών
	let lcm=johnkscienceMathLcm(den1, den2);

	//Υπολογίζει τα "καπελάκια"
	let m1=lcm/den1;
	let m2=lcm/den2;
	
	//Μετατρέπει σε ομώνυμα
	num1*=m1;
	den1*=m1;
	num2*=m2;
	den2*=m2;
	
	//Υπολογίζει το αποτέλεσμα
	let resNum=num1+num2;
	let resDen=den1;
	
	//Μετατρέπει σε ανάγωγο
	let gcd=johnkscienceMathGcd(resNum, resDen);
	resNum/=gcd;
	resDen/=gcd;
	
	return '' + resNum + _FRAC_CHAR + resDen; 
}

/*Μετατρέπει ένα κλάσμα σε ανάγωγο*/
function johnkscienceMathFractionToIrreducible(frac){
	let num=Number(johnkscienceMathFractionNumerator(frac));
	let den=Number(johnkscienceMathFractionDenumerator(frac));
	
	//Μετατρέπει σε ανάγωγο
	let gcd=johnkscienceMathGcd(num, den);
	num/=gcd;
	den/=gcd;
	
	return '' + num + _FRAC_CHAR + den; 
}

/*αφαιρεί δύο κλάσματα (S, S)->S
  
  STRING johnkscienceMathFractionSub(STRING, STRING)

*/
function johnkscienceMathFractionSub(lhs, rhs){
	
	let num1=Number(johnkscienceMathFractionNumerator(lhs));
	let den1=Number(johnkscienceMathFractionDenumerator(lhs));
	let num2=Number(johnkscienceMathFractionNumerator(rhs));
	let den2=Number(johnkscienceMathFractionDenumerator(rhs));
	
	//Υπολογίζει το ΕΚΠ των παρανομαστών
	let lcm=johnkscienceMathLcm(den1, den2);

	//Υπολογίζει τα "καπελάκια"
	let m1=lcm/den1;
	let m2=lcm/den2;
	
	//Μετατρέπει σε ομώνυμα
	num1*=m1;
	den1*=m1;
	num2*=m2;
	den2*=m2;
	
	//Υπολογίζει το αποτέλεσμα
	let resNum=num1-num2;
	let resDen=den1;
	
	//Μετατρέπει σε ανάγωγο
	let gcd=johnkscienceMathGcd(resNum, resDen);
	resNum/=gcd;
	resDen/=gcd;
	
	return '' + resNum + _FRAC_CHAR + resDen; 
}

/*πολλαπλασιάζει δύο κλάσματα (S, S)->S
  
  STRING johnkscienceMathFractionMult(STRING, STRING)

*/
function johnkscienceMathFractionMult(lhs, rhs){
	
	let num1=Number(johnkscienceMathFractionNumerator(lhs));
	let den1=Number(johnkscienceMathFractionDenumerator(lhs));
	let num2=Number(johnkscienceMathFractionNumerator(rhs));
	let den2=Number(johnkscienceMathFractionDenumerator(rhs));
	
	//Υπολογίζει το αποτέλεσμα
	let resNum=num1*num2;
	let resDen=den1*den2;
	
	//Μετατρέπει σε ανάγωγο
	let gcd=johnkscienceMathGcd(resNum, resDen);
	resNum/=gcd;
	resDen/=gcd;
	
	return '' + resNum + _FRAC_CHAR + resDen; 
}

/*διαιρεί δύο κλάσματα (S, S)->S
  
  STRING johnkscienceMathFractionDiv(STRING, STRING)

*/
function johnkscienceMathFractionDiv(lhs, rhs){
	
	let num1=Number(johnkscienceMathFractionNumerator(lhs));
	let den1=Number(johnkscienceMathFractionDenumerator(lhs));
	let num2=Number(johnkscienceMathFractionNumerator(rhs));
	let den2=Number(johnkscienceMathFractionDenumerator(rhs));
	
	//Υπολογίζει το αποτέλεσμα
	let resNum=num1*den2;
	let resDen=den1*num2;
	
	//Μετατρέπει σε ανάγωγο
	let gcd=johnkscienceMathGcd(resNum, resDen);
	resNum/=gcd;
	resDen/=gcd;
	
	return '' + resNum + _FRAC_CHAR + resDen; 
}

/*μετατρέπει ένα κλάσμα σε δεκαδικό (S)->S
  το αποτέλεσμα μπορεί να είναι σε επιστημονική
  σημειογραφία.
  
  STRING johnkscienceMathFractionToDecimal(STRING)

*/
function johnkscienceMathFractionToNormal(num, decimals){
	
	let num1=Number(johnkscienceMathFractionNumerator(num));
	let den1=Number(johnkscienceMathFractionDenumerator(num));
	
	//Υπολογίζει το δεκαδικό
	let res=Number(num1/den1).toPrecision(decimals);
	res=johnkscienceStringDeleteTrailingZeros(''+res);
	
	return '' + res; 
}

/*μετατρέπει ένα κλάσμα σε επιστημονική σημειογραφία (S, N)->S
  decimals είναι ο αριθμός των δεκαδικών ψηφίων
  
  STRING johnkscienceMathFractionToScientific(STRING)

*/
function johnkscienceMathFractionToScientific(num, decimals){
	
	let num1=Number(johnkscienceMathFractionNumerator(num));
	let den1=Number(johnkscienceMathFractionDenumerator(num));
	
	//Υπολογίζει την επιστημονική γραφή
	let res=Number(num1/den1).toExponential(decimals);
	
	return '' + res; 
}

/*μετατρέπει ένα κλάσμα σε σημειογραφία fixed (S, N)->S
  decimals είναι ο αριθμός των δεκαδικών ψηφίων
  
  STRING johnkscienceMathFractionToFixed(STRING, NUMBER)

*/
function johnkscienceMathFractionToFixed(num, decimals){
	
	let num1=Number(johnkscienceMathFractionNumerator(num));
	let den1=Number(johnkscienceMathFractionDenumerator(num));
	
	//Υπολογίζει την επιστημονική γραφή
	let res=Number(num1/den1).toFixed(decimals);
	
	return '' + res; 
}

/* Επιστρέφει true εάν το κλάσμα είναι ακέραιος*/
function johnkscienceMathFractionIsInteger(num){
	
	let a=johnkscienceMathFractionToScientific(num);
	
	if( Number.isInteger(a-0) ){
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν το κλάσμα είναι 0/0 */
function johnkscienceMathFractionIsNaN(num){
	
	if( Number(johnkscienceMathFractionNumerator(num))==0 && Number(johnkscienceMathFractionDenumerator(num))==0 ) {
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν το κλάσμα είναι a/0 */
function johnkscienceMathFractionIsInfinity(num){
	
	if( Number(johnkscienceMathFractionNumerator(num))!=0 && Number(johnkscienceMathFractionDenumerator(num))==0 ) {
		return true;
	}else{
		return false;
	}
}

/*Επιστρέφει true εάν  αριθμός είναι 0*/
function johnkscienceMathFractionIsZero(num){
	if(Number(johnkscienceMathFractionDenumerator(num))!=0 &&
	   Number(johnkscienceMathFractionNumerator(num))==0) {
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν το όρισμα είναι κλάσμα.
   Ένα κλάσμα πρέπει να έχει την μορφή
   
   INTEGER/INTEGER ή INTEGER
   
   όπου / είναι ο χαρακτήρας _FRAC_CHAR
   
   */
function johnkscienceMathFractionIs(num){
	
	if(num.indexOf(_FRAC_CHAR)<0 && Number.isInteger(num-0)){
		return true;
	}else if(num.indexOf(_FRAC_CHAR)<0){
		return false;
	}
	
	let res=num.split(_FRAC_CHAR);
	if(Number.isInteger(res[0]-0) && Number.isInteger(res[1]-1)){
		return true;
	}else{
		return false;
	}
	
}

/*Επιστρέφει true εάν τα κλάσματα είναι ίσα*/
function johnkscienceMathFractionIsEquals(num1, num2){
	
	//Μετατρέπει τα κλάσματα σε ανάγωγα.
	let n1=johnkscienceMathFractionToIrreducible(num1);
	let n2=johnkscienceMathFractionToIrreducible(num2);
	
	//Συγκρίνει τους αριθμητές με τους παρανομαστές
	if(
		Number(johnkscienceMathFractionDenumerator(n1))==
		Number(johnkscienceMathFractionDenumerator(n2)) &&
	    Number(johnkscienceMathFractionNumerator(n1))==
		Number(johnkscienceMathFractionNumerator(n2))) {
		return true;
	}else{
		return false;
	}
}

/* Μετατρέπει έναν δεκαδικό αριθμό της μορφής
   DIGITS.DIGITS σε κλάσμα INTEGER/INTEGER
   (S)->S
   */
function johnkscienceMathFractionTo(num){
	
	// Ο αριθμός είναι ακέραιος.
	if ( Number.parseFloat( num ) === Number.parseInt( num ) ) {
		return num+ _FRAC_CHAR + '1';
	}
	
	//Μετατρέπει τον αριθμό
	let len = num.length - 2;
	let denominator = Math.pow(10, len);
	let numerator = Number(num) * denominator;
	let divisor = johnkscienceMathGcd(numerator, denominator);
	numerator /= divisor;
	denominator /= divisor;
	
	num = Math.floor(numerator) + _FRAC_CHAR + Math.floor(denominator);
	return num;
}

/*Αν ένα κλάσμα είναι μικρότερος από approx τότε μετατρέπετε σε μηδέν*/
function johnkscienceMathFractionApproxToZero(num, approx){
	
	let res=Number(johnkscienceMathFractionToScientific(num));
	if(res<approx && res>-approx){
		return '0';
	}else{
		return num;
	}
}

function johnkscienceMathFractionToHuman(num, approxToZero, format, decimals){
	
    if(!num) return 'Συντακτικό λάθος. ';
    
    if(johnkscienceMathFractionIsZero(num)){
		return '0';
	}

	switch(format){
		case 'normal':
			if(approxToZero>0){
				return johnkscienceMathFractionToNormal(
					johnkscienceMathFractionApproxToZero(
						num, approxToZero 
					), decimals
				)
			}else{
				return johnkscienceMathFractionToNormal(
					num, decimals
				)
			}
			break;
		case 'fixed':
			if(approxToZero>0){
				return johnkscienceMathFractionToFixed(
					johnkscienceMathFractionApproxToZero(
						num, approxToZero 
					), decimals
				)
			}else{
				return johnkscienceMathFractionToFixed(
					num, decimals
				)
			}
			break;
		case 'scientific':
			if(approxToZero>0){
				return johnkscienceMathFractionToScientific(
					johnkscienceMathFractionApproxToZero(
						num, approxToZero 
					), decimals
				)
			}else{
				return johnkscienceMathFractionToScientific(
					num, decimals
				)
			}
			break;
	}

}

/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%  ΕΠΙΣΤΗΜΟΝΙΚΗ ΣΗΜΕΙΟΓΡΑΦΙΑ (SCIENTIFIC)  %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Οι παρακάτω συναρτήσεις χαμηλού επιπέδου χειρίζονται 
  αλφαριθμητικά που περιέχουν αριθμούς σε επιστημονική 
  σημειογραφία.  Αυτοί οι αριθμοί είναι στην μορφή 
   "ΚΛΑΣΜΑ Ε+-ΑΚΕΡΑΙΟΣ".
  
  Ένας τέτοιος αριθμός είναι στην μορφή:
  
  MANTISSA [E +- EXPONENT]
  FRACTION [E +- INTEGER]
  INTEGER[/INTEGER] [E +- INTEGER]
  
  π.χ. οι παρακάτω έχουν μόνο mantissa  
		
		0, 1, -1, 2_3, -2_3, 2_-3, -2_-3
		2e+3, 2e3, 200e-1,
		2e3_5, 2_5e+2, 2e+3_5e+2
		'', _2, 3_, e2, 3_e2
	   
	   οι παρακάτω έχουν και εκθετικό
	   0Ε3, 4Ε+3, 2_3Ε-5
	   2e3_4e2E-5
	
  πρέπει να προσέξετε ότι ο χαρακτήρας e είναι διαφορετικός από τον Ε.
  o e χρησιμοποιείται για το εκθετικό στον αριθμητή και παρανομαστή των
  κλασμάτων ενώ ο Ε για το εκθετικό των SCIENTIFIC.
  
  
*/

/*Επιστρέφει το mantissa (κλασμτικό μέρος) (S)->S
	
  STRING johnkscienceMathScientificMantissa( STRING )
*/
function johnkscienceMathScientificMantissa(num){
	//Αναζητεί αν υπάρχει ένα τελευταίο μοτίβο εκθετικού
	let i = num.search(/E[+-]?\d+$/);
	if(i>=0){
		let n=num.slice(0,i);
		if(n==''){
			return '1';
		}else{
			return n;
		}
	}else{
		return num;
	}

}

/*Επιστρέφει το εκθετικό μέρος (S)->S
	
  STRING johnkscienceMathScientificExponent( STRING )
  
  π.χ.
  -2,  0,  23,  2/3,  -2/3,  2/-3,  2/3e23, 2/3e+23,
  2/3e-23, 2/3e0, 2/3e-0, 2e+3_4e+2, 2/3e+3_4/5e-6e-23
  κτλ.
	
	*/
function johnkscienceMathScientificExponent(num){
	
	//Αναζητεί αν υπάρχει ένα τελευταίο μοτίβο εκθετικού
	//όπως e+10, e-30, e20, E+10
	let i = num.search(/E[+-]?\d+$/);
	if(i>=0){
		return num.slice(i+1);
	}else{
		return '0';
	}

}

/*προσθέτει δύο scientific (S, S)->S
  
  STRING johnkscienceMathScientificAdd(STRING, STRING)
  
  (FRACTION E +- INTEGER) + (FRACTION E +- INTEGER)

*/
function johnkscienceMathScientificAdd(lhs, rhs){
	
	let man1=johnkscienceMathScientificMantissa(lhs);
	let exp1=Number(johnkscienceMathScientificExponent(lhs));
	let man2=johnkscienceMathScientificMantissa(rhs);
	let exp2=Number(johnkscienceMathScientificExponent(rhs));
	
	//Αλαγή βάσης στο πρώτο αριθμό
	let mult=Math.pow(10,(exp1-exp2));
	mult=johnkscienceMathFractionTo(''+mult);	
	man1=johnkscienceMathFractionMult(man1, mult);
	
	let resMan=johnkscienceMathFractionAdd(man1, man2);
	let resExp=exp2;
	

	
	return '' + resMan + _EXP2_CHAR + resExp; 
}

/*αφαιρεί δύο scientific (S, S)->S
  
  STRING johnkscienceMathScientificSub(STRING, STRING)

*/
function johnkscienceMathScientificSub(lhs, rhs){
	
	let man1=johnkscienceMathScientificMantissa(lhs);
	let exp1=Number(johnkscienceMathScientificExponent(lhs));
	let man2=johnkscienceMathScientificMantissa(rhs);
	let exp2=Number(johnkscienceMathScientificExponent(rhs));
	
	//Αλαγή βάσης στο πρώτο αριθμό
	let mult=Math.pow(10,(exp1-exp2));
	mult=johnkscienceMathFractionTo(''+mult);	
	man1=johnkscienceMathFractionMult(man1, mult);
	
	let resMan=johnkscienceMathFractionSub(man1, man2);
	let resExp=exp2;
	

	
	return '' + resMan + _EXP2_CHAR + resExp; 
}

/*πολλαπλασιάζει δύο scientific (S, S)->S
  
  STRING johnkscienceMathScientificMult(STRING, STRING)
  
  FRACTION E +- INTEGER * FRACTION E +- INTEGER

*/
function johnkscienceMathScientificMult(lhs, rhs){
	
	let man1=johnkscienceMathScientificMantissa(lhs);
	let exp1=Number(johnkscienceMathScientificExponent(lhs));
	let man2=johnkscienceMathScientificMantissa(rhs);
	let exp2=Number(johnkscienceMathScientificExponent(rhs));
	
	//Υπολογίζει το αποτέλεσμα
	let resMan=johnkscienceMathFractionMult(man1, man2);;
	let resExp=''+(exp1+exp2);
	let res;
	if(resExp.indexOf('+')<0 && resExp.indexOf('-')<0){
		res=''+resMan+'E+'+resExp;
	}else{
		res=''+resMan+'E'+resExp;
	}
	
	return res; 
}

/*διαιρεί δύο scientific (S, S)->S
  
  STRING johnkscienceMathScientificDiv(STRING, STRING)

*/
function johnkscienceMathScientificDiv(lhs, rhs){
	
	let man1=johnkscienceMathScientificMantissa(lhs);
	let exp1=Number(johnkscienceMathScientificExponent(lhs));
	let man2=johnkscienceMathScientificMantissa(rhs);
	let exp2=Number(johnkscienceMathScientificExponent(rhs));
	
	//Υπολογίζει το αποτέλεσμα
	let resMan=johnkscienceMathFractionDiv(man1, man2);;
	let resExp=''+(exp1-exp2);
	let res;
	if(resExp.indexOf('+')<0 && resExp.indexOf('-')<0){
		res=''+resMan+'E+'+resExp;
	}else{
		res=''+resMan+'E'+resExp;
	}
	
	return res; 
}

/*μετατρέπει ένα κλάσμα σε δεκαδικό (S)->S
  το αποτέλεσμα μπορεί να είναι σε επιστημονική
  σημειογραφία.
  
  STRING johnkscienceMathScientificToNormal(STRING)

*/
function johnkscienceMathScientificToNormal(num, decimals){
	
	//Παίρνει το mantissa που μπορεί να είναι κλασματικό
	let man=johnkscienceMathScientificMantissa(num);
	//Υπολογίζει το εκθετικό
	let exp=johnkscienceMathScientificExponent(num);
	
	//Μετατρέπει το mantissa σε επιστημονική γραφή
	man=johnkscienceMathFractionToScientific(man);
	//Μετατρέπει το εκθετικό σε επιστημονική γραφή
	if(exp.indexOf('+')<0 && exp.indexOf('-')<0){
		exp='1e+'+exp;
	}else{
		exp='1e'+exp;
	}
	
	
	//Πολλαπλασιάζει τους δύο αριθμούς
	let res=Number(man)*Number(exp);

	//Μετατρέπει το αποτέλεσμα σε Normal
	res=Number(res).toPrecision(decimals);
	res=johnkscienceStringDeleteTrailingZeros(''+res);
	return '' + res; 
	
}

/*μετατρέπει ένα scientific σε επιστημονική σημειογραφία (S, N)->S
  decimals είναι ο αριθμός των δεκαδικών ψηφίων
  
  STRING johnkscienceMathFractionToScientific(STRING)
  
  FRACTION E +- INTEGER --> DECIMAL E +- INTEGER

*/
function johnkscienceMathScientificToScientific(num, decimals){
	
	//Παίρνει το mantissa που μπορεί να είναι κλασματικό
	let man=johnkscienceMathScientificMantissa(num);
	//Υπολογίζει το εκθετικό
	let exp=johnkscienceMathScientificExponent(num);
	//console.log("Scientific", num,",", man,",", exp);
	
	//Μετατρέπει το mantissa σε επιστημονική γραφή
	man=johnkscienceMathFractionToScientific(man);
	//Μετατρέπει το εκθετικό σε επιστημονική γραφή
	if(exp.indexOf('+')<0 && exp.indexOf('-')<0){
		exp='1e+'+exp;
	}else{
		exp='1e'+exp;
	}
	
	
	//Πολλαπλασιάζει τους δύο αριθμούς
	let res=Number(man)*Number(exp);

	//Μετατρέπει το αποτέλεσμα σε επιστημονική γαρφή
	res=Number(res).toExponential(decimals);
	return '' + res; 
}

/*μετατρέπει ένα κλάσμα σε σημειογραφία fixed (S, N)->S
  decimals είναι ο αριθμός των δεκαδικών ψηφίων
  
  STRING johnkscienceMathScientificToFixed(STRING, NUMBER)

*/
function johnkscienceMathScientificToFixed(num, decimals){
	
	//Παίρνει το mantissa που μπορεί να είναι κλασματικό
	let man=johnkscienceMathScientificMantissa(num);
	//Υπολογίζει το εκθετικό
	let exp=johnkscienceMathScientificExponent(num);
	
	//Μετατρέπει το mantissa σε ειστημονική γραφή
	man=johnkscienceMathFractionToScientific(man);
	//Μετατρέπει το εκθετικό σε επιστημονική γραφή
	if(exp.indexOf('+')<0 && exp.indexOf('-')<0){
		exp='1e+'+exp;
	}else{
		exp='1e'+exp;
	}
	
	
	//Πολλαπλασιάζει τους δύο αριθμούς
	let res=Number(man)*Number(exp);

	//Μετατρέπει το αποτέλεσμα σε Normal
	res=Number(res).toFixed(decimals);
	return '' + res; 
}

/* Επιστρέφει true εάν είναι ακέραιος (S)->S */
function johnkscienceMathScientificIsInteger(num){
	
	let a=johnkscienceMathScientificToScientific(num);
	
	if( Number.isInteger(a-0) ){
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν το κλάσμα του mantissa είναι 0/0. (S)->S */
function johnkscienceMathScientificIsNaN(num){
	
	if( johnkscienceMathFractionIsNaN(johnkscienceMathScientificMantissa(num)) ){
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν το κλάσμα του mantissa είναι a/0 (S)->S*/
function johnkscienceMathScientificIsInfinity(num){
	
	if( johnkscienceMathFractionIsInfinity(johnkscienceMathScientificMantissa(num)) ) {
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν το κλάσμα mantissa είναι ένας πραγματικός αριθμός (S)->S
function johnkscienceMathScientificIsReal(num){
	
	if( johnkscienceMathFractionIsReal(johnkscienceMathScientificMantissa(num)) ) {
		return true;
	}else{
		return false;
	}
}
*/

/* Επιστρέφει true εάν το όρισμα είναι scientific. (S)->S
   Ένα κλάσμα πρέπει να έχει την μορφή
   
   Ένας τέτοιος αριθμός είναι στην μορφή:
  
  MANTISSA [E +- EXPONENT]
  FRACTION [E +- INTEGER]
  INTEGER[/INTEGER] [E +- INTEGER]
   
   */
function johnkscienceMathScientificIs(num){
	
	let man=johnkscienceMathScientificMantissa(num);
	let exp=johnkscienceMathScientificExponent(num);
	
	if( johnkscienceMathFractionIs(man) && Number.isInteger(exp-0)){
		return true;
	}else{
		return false;
	}
	
}

/* Επιστρέφει true εάν οι αριθμοί είναι ίσοι */
function johnkscienceMathScientificIsEquals(num1, num2){
	
	let man1=johnkscienceMathScientificMantissa(num1);
	let exp1=johnkscienceMathScientificExponent(num1);
	let man2=johnkscienceMathScientificMantissa(num2);
	let exp2=johnkscienceMathScientificExponent(num2);
	
	if( johnkscienceMathFractionIsEquals(man1, man2) && 
		Number.isInteger(exp1-0)==Number.isInteger(exp2-0)){
		return true;
	}else{
		return false;
	}
	
}

/*Επιστρέφει true εάν  αριθμός είναι 0*/
function johnkscienceMathScientificIsZero(num){
	if( johnkscienceMathFractionIsZero(
		johnkscienceMathScientificMantissa(num)) ) {
		return true;
	}else{
		return false;
	}
}

/* Μετατρέπει έναν δεκαδικό αριθμό σε scientific. (S)->S
   DIGITS.DIGITSe+-digits --> scientific
   Ένας τέτοιος αριθμός είναι στην μορφή:
  
	  MANTISSA [E +- EXPONENT]
	  FRACTION [E +- INTEGER]
	  INTEGER[/INTEGER] [E +- INTEGER]
   
   Δεν γίνεται έλεγχος για συντακτικά λάθη.
 */
function johnkscienceMathScientificTo(num){
	//Επιλέγει το mantissa και το εκθετικό
	let man,exp;
	let i = num.search(/[eE][+-]?\d+$/);
	if(i>=0){
		let n=num.slice(0,i);
		exp=num.slice(i+1);
		if(n==''){
			man= '1';
		}else{
			man= n;
		}
	}else{
		man=num;
		exp='0';
	}
	
	man=johnkscienceMathFractionTo(man);
	return '' + man + _EXP2_CHAR + '' + exp;
}

/*Αν ένα scientific είναι μικρότερος από approx τότε μετατρέπετε σε μηδέν*/
function johnkscienceMathScientificApproxToZero(num, approx){
	
	let res=Number(johnkscienceMathScientificToScientific(num));
	if(res<approx && res>-approx){
		return '0';
	}else{
		return num;
	}
}


function johnkscienceMathScientificToHuman(num, approxToZero, format, decimals){
	
    if(!num) return 'Συντακτικό λάθος. ';
    
    if(johnkscienceMathScientificIsZero(num)){
		return '0';
	}

	switch(format){
		case 'normal':
			if(approxToZero>0){
				return johnkscienceMathScientificToNormal(
					johnkscienceMathScientificApproxToZero(
						num, approxToZero 
					), decimals
				)
			}else{
				return johnkscienceMathScientificToNormal(
					num, decimals
				)
			}
			break;
		case 'fixed':
			if(approxToZero>0){
				return johnkscienceMathScientificToFixed(
					johnkscienceMathScientificApproxToZero(
						num, approxToZero 
					), decimals
				)
			}else{
				return johnkscienceMathScientificToFixed(
					num, decimals
				)
			}
			break;
		case 'scientific':
			if(approxToZero>0){
				return johnkscienceMathScientificToScientific(
					johnkscienceMathFractionApproxToZero(
						num, approxToZero 
					), decimals
				)
			}else{
				return johnkscienceMathScientificToScientific(
					num, decimals
				)
			}
			break;
	}

}

function johnkscienceMathScientificMax(num1, num2){
	let n1=Number(johnkscienceMathScientificToScientific(num1));
	let n2=Number(johnkscienceMathScientificToScientific(num1));
	if(n1>=n2){
		return num1;
	}else{
		return num2;
	}
}

function johnkscienceMathScientificMin(num1, num2){
	let n1=Number(johnkscienceMathScientificToScientific(num1));
	let n2=Number(johnkscienceMathScientificToScientific(num1));
	if(n1<=n2){
		return num1;
	}else{
		return num2;
	}	
}

function johnkscienceMathScientificRound(num){
	let n=Number(johnkscienceMathScientificToScientific(num));
	return johnkscienceMathScientificTo( ''+Math.round(n) );
}

function johnkscienceMathScientificFloor(num){
	let n=Number(johnkscienceMathScientificToScientific(num));
	return johnkscienceMathScientificTo( ''+Math.floor(n) );
}

function johnkscienceMathScientificCeil(num){
	let n=Number(johnkscienceMathScientificToScientific(num));
	return johnkscienceMathScientificTo( ''+Math.ceil(n) );
}

/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%     ΜΙΓΑΔΙΚΟΙ (IMAGINE NUMBERS)      %%
	%%          ΟΡΘΟΓΩΝΙΑ ΜΟΡΦΗ             %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Οι παρακάτω συναρτήσεις χαμηλού επιπέδου χειρίζονται 
  αλφαριθμητικά που περιέχουν μιγαδικούς σε ορθογώνια 
  μορφή.
  
  Ένας μιγαδικός είναι στην μορφή 
  
  SCIENTIFIC [+I SCIENTIFIC]
  
  */

/*Επιστρέφει το πραγματικό μέρος του μιγαδικού (S)->S
	
  STRING johnkscienceMathComplexRecReal( STRING )
  
  π.χ. 34_3&45_56
  
	
	*/
function johnkscienceMathComplexRecReal(num){
	let n=num.indexOf(_IMG_REC_CHAR);
	let res;
	if(n<0){
		res=num;
	}else{
		res=num.slice(0,n);
	}
	if(johnkscienceMathIsEmpty(''+res)){
		return '0';
	}else{
		return res;
	}
	
	/*
	if( !johnkscienceMathIsEmpty(num.split(_IMG_REC_CHAR)[0]) ){
			return num.split(_IMG_REC_CHAR)[0];
		}else{
			return '0';
		}
	*/
}

/*Επιστρέφει το φανταστικό μέρος του μιγαδικού (S)->S
	
  STRING johnkscienceMathComplexRecImg( STRING )
  
  π.χ. 5_3&23_4e3, 5_3, &5_4, 34_4&
	
	*/
function johnkscienceMathComplexRecImg(num){
	let n=num.indexOf(_IMG_REC_CHAR);
	let res;
	if(n<0){
		res='0';
	}else{
		res=num.slice(n+1);
	}
	if(johnkscienceMathIsEmpty(''+res)){
		return '0';
	}else{
		return res;
	}
		
		
	/*	
		if( !johnkscienceMathIsEmpty(num.split(_IMG_REC_CHAR)[1]) ){
			return num.split(_IMG_REC_CHAR)[1];
		}else{
			return '0';
		}
	*/
}

/*προσθέτει δύο μιγαδικούς (S, S)->S
  
  STRING johnkscienceMathComplexRecAdd(STRING, STRING)
  
*/
function johnkscienceMathComplexRecAdd(lhs, rhs){
	
	let real1=johnkscienceMathComplexRecReal(lhs);
	let img1=johnkscienceMathComplexRecImg(lhs);
	let real2=johnkscienceMathComplexRecReal(rhs);
	let img2=johnkscienceMathComplexRecImg(rhs);

	let resReal=johnkscienceMathScientificAdd(real1, real2);
	let resImg=johnkscienceMathScientificAdd(img1, img2);

	
	return '' + resReal + _IMG_REC_CHAR + resImg; 
}

/*αφαιρεί δύο μιγαδικούς (S, S)->S
  
  STRING johnkscienceMathComplexRecSub(STRING, STRING)

*/
function johnkscienceMathComplexRecSub(lhs, rhs){
	
	let real1=johnkscienceMathComplexRecReal(lhs);
	let img1=johnkscienceMathComplexRecImg(lhs);
	let real2=johnkscienceMathComplexRecReal(rhs);
	let img2=johnkscienceMathComplexRecImg(rhs);

	let resReal=johnkscienceMathScientificSub(real1, real2);
	let resImg=johnkscienceMathScientificSub(img1, img2);

	
	return '' + resReal + _IMG_REC_CHAR + resImg; 
}

/*πολλαπλασιάζει δύο μιγαδικούς (S, S)->S
  
  STRING johnkscienceMathComplexRecMult(STRING, STRING)

*/
function johnkscienceMathComplexRecMult(lhs, rhs){
	
	let real1=johnkscienceMathComplexRecReal(lhs);
	let img1=johnkscienceMathComplexRecImg(lhs);
	let real2=johnkscienceMathComplexRecReal(rhs);
	let img2=johnkscienceMathComplexRecImg(rhs);

	let resReal=johnkscienceMathScientificSub(
			johnkscienceMathScientificMult(real1, real2),
			johnkscienceMathScientificMult(img1, img2)
			);

	let resImg=johnkscienceMathScientificAdd(
			johnkscienceMathScientificMult(real1, img2),
			johnkscienceMathScientificMult(img1, real2)
			);
	
	return '' + resReal + _IMG_REC_CHAR + resImg; 
}

/*διαιρεί δύο μιγαδικούς (S, S)->S
  
  STRING johnkscienceMathComplexRecDiv(STRING, STRING)

*/
function johnkscienceMathComplexRecDiv(lhs, rhs){
	
	let real1=johnkscienceMathComplexRecReal(lhs);
	let img1=johnkscienceMathComplexRecImg(lhs);
	let real2=johnkscienceMathComplexRecReal(rhs);
	let img2=johnkscienceMathComplexRecImg(rhs);

	let resReal=
	johnkscienceMathScientificDiv(
		johnkscienceMathScientificAdd(
			johnkscienceMathScientificMult(real1, real2),
			johnkscienceMathScientificMult(img1, img2)),
		johnkscienceMathScientificAdd(
			johnkscienceMathScientificMult(real2, real2),
			johnkscienceMathScientificMult(img2, img2)));


	let resImg=
	johnkscienceMathScientificDiv(
		johnkscienceMathScientificSub(
			johnkscienceMathScientificMult(img1, real2),
			johnkscienceMathScientificMult(real1, img2)),
		johnkscienceMathScientificAdd(
			johnkscienceMathScientificMult(real2, real2),
			johnkscienceMathScientificMult(img2, img2)));
	
	return '' + resReal + _IMG_REC_CHAR + resImg; 
}

/*μετατρέπει ένα μιγαδικό από μορφή κλάσματος σε μιγαδικό σε
  μορφή δεκαδικού (S)->S
  το αποτέλεσμα μπορεί να είναι σε επιστημονική
  σημειογραφία.
  
  STRING johnkscienceMathComplexRecToNormal(STRING)

*/
function johnkscienceMathComplexRecToNormal(num, decimals){
		
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	real=johnkscienceMathScientificToNormal(real, decimals);
	img=johnkscienceMathScientificToNormal(img, decimals);
	
	return '' + real + _IMG_REC_CHAR + img; 
	
}

/*μετατρέπει ένα μιγαδικό σε επιστημονική σημειογραφία (S, N)->S
  decimals είναι ο αριθμός των δεκαδικών ψηφίων
  
  STRING johnkscienceMathFractionToScientific(STRING)
  
  FRACTION E +- INTEGER --> DECIMAL E +- INTEGER

*/
function johnkscienceMathComplexRecToScientific(num, decimals){
		
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	real=johnkscienceMathScientificToScientific(real, decimals);
	img=johnkscienceMathScientificToScientific(img, decimals);
	return '' + real + _IMG_REC_CHAR + img; 
}

/*μετατρέπει ένα μιγαδικό σε σημειογραφία fixed (S, N)->S
  decimals είναι ο αριθμός των δεκαδικών ψηφίων
  
  STRING johnkscienceMathComplexRecToFixed(STRING, NUMBER)

*/
function johnkscienceMathComplexRecToFixed(num, decimals){
		
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	real=johnkscienceMathScientificToFixed(real, decimals);
	img=johnkscienceMathScientificToFixed(img, decimals);
	
	return '' + real + _IMG_REC_CHAR + img; 
}

/* Επιστρέφει true εάν ο μιγαδικός έχει ακέραια μέρη (S)->S */
function johnkscienceMathComplexRecIsInteger(num){
		
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	if( johnkscienceMathScientificIsInteger(real) && johnkscienceMathScientificIsInteger(img)){
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν κάποιο μέρος του μιγαδικού είναι 0/0. (S)->S */
function johnkscienceMathComplexRecIsNaN(num){
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	if( johnkscienceMathScientificIsNaN(real) || 
		johnkscienceMathScientificIsNaN(img)){
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν κάποιο μέρος του μιγαδικού είναι a/0 (S)->S*/
function johnkscienceMathComplexRecIsInfinity(num){
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	if( johnkscienceMathScientificIsInfinity(real) || 
		johnkscienceMathScientificIsInfinity(img)){
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν ο μιγαδικός έχει πραγματικά μέρη (S)->S
function johnkscienceMathComplexRecIsReal(num){
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	if( johnkscienceMathScientificIsReal(real) &&
		johnkscienceMathScientificIsReal(img)){
		return true;
	}else{
		return false;
	}
}
*/

/*Επιστρέφει true εάν  αριθμός είναι 0*/
function johnkscienceMathComplexRecIsZero(num){
	if( johnkscienceMathScientificIsZero(johnkscienceMathComplexRecReal(num)) &&
	johnkscienceMathScientificIsZero(johnkscienceMathComplexRecImg(num))){
		return true;
	}else{
		return false;
	}
}

/*Επιστρέφει true εάν το φανταστικό μέρος είναι μηδέν (πραγματικός)*/
function johnkscienceMathComplexRecIsReal(num){
	if( Number(johnkscienceMathScientificToScientific(
	johnkscienceMathComplexRecImg(num))) == 0){
		return true;
	}else{
		return false;
	}
}

/*Επιστρέφει true εάν το πραγματικό μέρος είναι μηδέν (φανταστικός)*/
function johnkscienceMathComplexRecIsImg(num){
	if( Number(johnkscienceMathScientificToScientific(
	johnkscienceMathComplexRecReal(num))) == 0){
		return true;
	}else{
		return false;
	}
}

/* Επιστρέφει true εάν το όρισμα είναι μιγαδικός. (S)->S
   Ένα κλάσμα πρέπει να έχει την μορφή
   
   Ένας τέτοιος αριθμός είναι στην μορφή:
  
  MANTISSA [E +- EXPONENT]
  FRACTION [E +- INTEGER]
  INTEGER[/INTEGER] [E +- INTEGER]
   
   */
function johnkscienceMathComplexRecIs(num){
	
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	if( johnkscienceMathScientificIs(real) &&
		johnkscienceMathScientificIs(img)){
		return true;
	}else{
		return false;
	}
	
}

/* Επιστρέφει true εάν δύο μιγαδικοί είναι ίσοι
   */
function johnkscienceMathComplexRecIsEquals(num1, num2){
	
	let real1=johnkscienceMathComplexRecReal(num1);
	let img1=johnkscienceMathComplexRecImg(num1);
	let real2=johnkscienceMathComplexRecReal(num2);
	let img2=johnkscienceMathComplexRecImg(num2);


	if( johnkscienceMathScientificIsEquals(real1, real2) &&
		johnkscienceMathScientificIsEquals(img1, img2)){
		return true;
	}else{
		return false;
	}
	
}

/* Μετατρέπει τα μέρη του μιγαδικού σε scientific/κλάσματα (S)->S
   DIGITS.DIGITSe+-digits --> scientific
   Ένας τέτοιος αριθμός είναι στην μορφή:
  
	  MANTISSA [E +- EXPONENT]
	  FRACTION [E +- INTEGER]
	  INTEGER[/INTEGER] [E +- INTEGER]
   
   
   */
function johnkscienceMathComplexRecTo(num){
	
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	real=johnkscienceMathScientificTo(real);
	img=johnkscienceMathScientificTo(img);
	
	return '' + real + _IMG_REC_CHAR + img; 
}

/*Αν ένα scientific είναι μικρότερος από approx τότε μετατρέπετε σε μηδέν*/
function johnkscienceMathComplexRecApproxToZero(num, approx){
	
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	let resReal=Number(johnkscienceMathScientificToScientific(real));
	if(resReal<approx && resReal>-approx){
		resReal='0';
	}else{
		resReal=real;
	}
	
	let resImg=Number(johnkscienceMathScientificToScientific(img));
	if(resImg<approx && resImg>-approx){
		resImg='0';
	}else{
		resImg=img;
	}
	
	return '' + resReal + _IMG_REC_CHAR + resImg;
}


function johnkscienceMathComplexRecToHuman(num, approxToZero, format, decimals){
	
	let result;

    if(!num) return 'Συντακτικό λάθος. ';

	if(johnkscienceMathComplexRecIsZero(num)){
		return '0';
	}

	switch(format){
		case 'normal':
			if(approxToZero>0){
				result = johnkscienceMathComplexRecToNormal(
					johnkscienceMathComplexRecApproxToZero(
						num, approxToZero 
					), decimals
				)
			}else{
				result = johnkscienceMathComplexRecToNormal(
					num, decimals
				)
			}
			break;
		case 'fixed':
			if(approxToZero>0){
				result = johnkscienceMathComplexRecToFixed(
					johnkscienceMathComplexRecApproxToZero(
						num, approxToZero 
					), decimals
				)
			}else{
				result = johnkscienceMathComplexRecToFixed(
					num, decimals
				)
			}
			break;
		case 'scientific':
			if(approxToZero>0){
				result = johnkscienceMathComplexRecToScientific(
					johnkscienceMathComplexRecApproxToZero(
						num, approxToZero 
					), decimals
				)
			}else{
				result = johnkscienceMathComplexRecToScientific(
					num, decimals
				)
			}
			break;
	}
	
	let real = johnkscienceMathComplexRecReal( result );
	let img = johnkscienceMathComplexRecImg( result );
	
	if(johnkscienceMathComplexRecIsZero(result)){
		return '0';
	}
	if(johnkscienceMathScientificIsZero(real)){
		return img+'*i';
	}
	if(johnkscienceMathScientificIsZero(img)){
		return real;
	}
	return real+'+'+img+'*i';

}

/* Επιστρέφει την συζυγή μορφή του μιγαδικού (S)->S
	
		Conj(a+bi)=a-bi
	
	*/
function johnkscienceMathComplexRecConjugate(num){
	
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);

	real=johnkscienceMathScientificMult(real, '1_1');
	img=johnkscienceMathScientificMult(img, '-1_1');
	
	return '' + real + _IMG_REC_CHAR + img; 
}

/*Επιστρέφει το μήκος του μιγαδικού σε πολική μορφή (S)->S
	
	Εάν  z=x+iy
	r= sqrt(x^2+y^2)
	
*/
function johnkscienceMathComplexRecModulus(num){
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	let res=johnkscienceMathScientificAdd(
				johnkscienceMathScientificMult(real, real),
				johnkscienceMathScientificMult(img, img));
	res=johnkscienceMathScientificToScientific(''+res);
	res=''+Math.sqrt(Number(''+res));
	return johnkscienceMathScientificTo(''+res);
}

/*Επιστρέφει τη γωνία σε rad του μιγαδικού σε πολική μορφή (S)->S
	
	Εάν  z=x+iy
	r= sqrt(x^2+y^2)
	
*/
function johnkscienceMathComplexRecArgument(num){
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	real=johnkscienceMathScientificToScientific(real);
	img=johnkscienceMathScientificToScientific(img);
	//Το αποτέλσμα της atan2 είναι στο διάστημα -π έως π
	let res=johnkscienceMathAtan2(Number(img),Number(real));
	if(res==-Math.PI) res=Math.PI;
	return johnkscienceMathScientificTo(''+res);
}

/*Υπολογίζει την δύναμη ενός μιγαδικού (S, N)->S
  από τον τύπο του DE MOIVRE. Βλέπε SCHAUM'S σελ 5
  πρέπει n ακέραιος, αλλιώς μπορεί να προκύψει
  runtime error. Δεν κάνει έλεγχο λαθών. Αν 0^0 ή 0^-2
  κτλ μπορεί να προκύψει άπειρος βρόγχος.
*/
function johnkscienceMathComplexRecPow(num,n){
	let mod=johnkscienceMathComplexRecModulus(num);
	let arg=johnkscienceMathComplexRecArgument(num);

	mod=johnkscienceMathScientificToScientific(mod);
	arg=johnkscienceMathScientificToScientific(arg);
	
	let real=Math.pow(Number(mod), n)* johnkscienceMathCos(n*Number(arg));
	let img=Math.pow(Number(mod), n)* johnkscienceMathSin(n*Number(arg));
	
	real=johnkscienceMathScientificTo(''+real);
	img=johnkscienceMathScientificTo(''+img);
	
	return  '' + real + _IMG_REC_CHAR + img; 
}

/*Υπολογίζει την k n-ρίζα ενός μιγαδικού (S, N, N)->S
  από τον τύπο του DE MOIVRE. Βλέπε SCHAUM'S σελ 5
  πρέπει n ακέραιος με n>0, αλλιώς μπορεί να προκύψει
  runtime error. Δεν κάνει έλεγχο λαθών. Αν 0^0 ή 0^-2
  κτλ μπορεί να προκύψει άπειρος βρόγχος.
*/
function johnkscienceMathComplexRecRoot(num,n,k){
	let mod=johnkscienceMathComplexRecModulus(num);
	let arg=johnkscienceMathComplexRecArgument(num);

	mod=johnkscienceMathScientificToScientific(mod);
	arg=johnkscienceMathScientificToScientific(arg);
	
	let real = Math.pow(Number(mod), 1/n)  * johnkscienceMathCos((Number(arg)+2*k*Math.PI)/n);
	
	let img = Math.pow(Number(mod), 1/n) * johnkscienceMathSin((Number(arg)+2*k*Math.PI)/n);
	
	real=johnkscienceMathScientificTo(''+real);
	img=johnkscienceMathScientificTo(''+img);
	
	//Στις συναρτήσεις που είναι αποτέλεσμα τριγωνομετρικών
	//πρέπει να διορθώνεται το όριο στο μηδέν.
	//real=johnkscienceMathScientificApproxToZero(''+real, _APPROX_TO_ZERO);
	//img=johnkscienceMathScientificApproxToZero(''+img, _APPROX_TO_ZERO);
	
	return  '' + real + _IMG_REC_CHAR + img; 
}

/*Υπολογίζει το εσωτερικό γινόμενο δύο μιγαδικών (S, S)->S*/
function johnkscienceMathComplexRecInner(lhs, rhs){
	
	let real1=johnkscienceMathComplexRecReal(lhs);
	let img1=johnkscienceMathComplexRecImg(lhs);
	let real2=johnkscienceMathComplexRecReal(rhs);
	let img2=johnkscienceMathComplexRecImg(rhs);
	
	return johnkscienceMathComplexRecReal(
		johnkscienceMathComplexRecMult(
			johnkscienceMathComplexRecConjugate(lhs),
			rhs));
}

/*Υπολογίζει το εξωτερικό γινόμενο δύο μιγαδικών (S, S)->S*/
function johnkscienceMathComplexRecCross(lhs, rhs){
	
	let real1=johnkscienceMathComplexRecReal(lhs);
	let img1=johnkscienceMathComplexRecImg(lhs);
	let real2=johnkscienceMathComplexRecReal(rhs);
	let img2=johnkscienceMathComplexRecImg(rhs);
	
	return johnkscienceMathComplexRecImg(
		johnkscienceMathComplexRecMult(
			johnkscienceMathComplexRecConjugate(lhs),
			rhs));
}

/*Υπολογίζει τις ρίζες της δευτεροβάθμιας εξίσωσης (S, S, S, N)->S
  Τα τρία πρώτα ορίσματα είναι οι μιγαδικοί συντελεστές του τριωνύμου.
  Το τέταρτο όρισμα μπορεί να να είναι 0,1,2. Αν είναι 0 η συνάρτηση 
  επιστρέφει την Διακρίνουσα, αν είανι 1 επιστρέφει την 1η ρίζα και 
  αν είναι 2 επιστρέφει την 2η ρίζα. Το πρώτο όρισμα δεν πρέπει να 
  είναι μηδέν. Δεν γίνεται έλεγχος λαθών.
	*/
function johnkscienceMathComplexRecQuadric(a, b, c, n){
	
	let D=johnkscienceMathComplexRecSub(
				johnkscienceMathComplexRecMult(b, b),
					johnkscienceMathComplexRecMult(
						"4",
						johnkscienceMathComplexRecMult(a,c)
						)
					);
	let x1=johnkscienceMathComplexRecDiv(
			johnkscienceMathComplexRecAdd(
				johnkscienceMathComplexRecSub("0", b),
				johnkscienceMathComplexRecRoot(D,2,0)),
			johnkscienceMathComplexRecMult("2", a));	
			
	let x2=johnkscienceMathComplexRecDiv(
			johnkscienceMathComplexRecSub(
				johnkscienceMathComplexRecSub("0", b),
				johnkscienceMathComplexRecRoot(D,2,0)),
			johnkscienceMathComplexRecMult("2", a));
			
	if(n==0){
		return D;
	}else if(n==1){
		return x1;
	}else{
		return x2;
	}
}

/*Υπολογίζει τον αντίθετο ενός μιγαδικού */
function johnkscienceMathComplexRecOpposite(num){
	
	return johnkscienceMathComplexRecSub('0', num);

}

/*Υπολογίζει τον αντίστροφο ενός μιγαδικού */
function johnkscienceMathComplexRecInverse(num){
	
	return johnkscienceMathComplexRecDiv("1", num);

}

/*Υπολογίζει το εκθετικό e^z, z in C */
function johnkscienceMathComplexRecExp(num){
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	real=Number(johnkscienceMathScientificToScientific(real));
	img=Number(johnkscienceMathScientificToScientific(img));
	let realRes=Math.exp(real)*johnkscienceMathCos(img);
	let imgRes=Math.exp(real)*johnkscienceMathSin(img);
	
	let res=''+realRes+_IMG_REC_CHAR+''+imgRes;
	res=johnkscienceMathComplexRecTo(res);
	//console.log("Exp",img, imgRes, res);
	return res;
}

/*Υπολογίζει το sin(z) , z in C */
function johnkscienceMathComplexRecSin(num){
	let result = johnkscienceMathComplexRecDiv(
		johnkscienceMathComplexRecSub(
			johnkscienceMathComplexRecExp(
				johnkscienceMathComplexRecMult('&1', num)
			),
			johnkscienceMathComplexRecExp(
				johnkscienceMathComplexRecMult('&-1', num)
			)
		),
		'&2'
	);
	
	//Εάν το όρισμα είναι πραγματικό επιστρέφει μόνο 
	//το πραγματικό μέρος του αποτελέσματος
	if(johnkscienceMathComplexRecIsReal(num)){
		return johnkscienceMathComplexRecReal(result); 
	}else{
		return result;
	}
}

/*Υπολογίζει το cos(z) , z in C */
function johnkscienceMathComplexRecCos(num){
	let result = johnkscienceMathComplexRecDiv(
		johnkscienceMathComplexRecAdd(
			johnkscienceMathComplexRecExp(
				johnkscienceMathComplexRecMult('&1', num)
			),
			johnkscienceMathComplexRecExp(
				johnkscienceMathComplexRecMult('&-1', num)
			)
		),
		'2'
	);
	
	//Εάν το όρισμα είναι πραγματικό επιστρέφει μόνο 
	//το πραγματικό μέρος του αποτελέσματος
	if(johnkscienceMathComplexRecIsReal(num)){
		return johnkscienceMathComplexRecReal(result); 
	}else{
		return result;
	}
}

/*Υπολογίζει το tan(z) , z in C */
function johnkscienceMathComplexRecTan(num){
	
	let result = johnkscienceMathComplexRecDiv(
				johnkscienceMathComplexRecSin(num),
				johnkscienceMathComplexRecCos(num)
			);
	
	//Εάν το όρισμα είναι πραγματικό επιστρέφει μόνο 
	//το πραγματικό μέρος του αποτελέσματος
	if(johnkscienceMathComplexRecIsReal(num)){
		return johnkscienceMathComplexRecReal(result); 
	}else{
		return result;
	}
}

/*Υπολογίζει το cot(z) , z in C */
function johnkscienceMathComplexRecCot(num){
	return johnkscienceMathComplexRecDiv(
				johnkscienceMathComplexRecCos(num),
				johnkscienceMathComplexRecSin(num)
			);
}

/*Υπολογίζει το sec(z) , z in C */
function johnkscienceMathComplexRecSec(num){
	return johnkscienceMathComplexRecDiv(
				"1",
				johnkscienceMathComplexRecCos(num)
			);
}

/*Υπολογίζει το csc(z) , z in C */
function johnkscienceMathComplexRecCsc(num){
	return johnkscienceMathComplexRecDiv(
				"1",
				johnkscienceMathComplexRecSin(num)
			);
}

/*Υπολογίζει το sinh(z) , z in C */
function johnkscienceMathComplexRecSinh(num){
	return johnkscienceMathComplexRecDiv(
		johnkscienceMathComplexRecSub(
			johnkscienceMathComplexRecExp(num),
			johnkscienceMathComplexRecExp(
				johnkscienceMathComplexRecMult('-1', num)
			)
		),
		'2'
	);
}

/*Υπολογίζει το cosh(z) , z in C */
function johnkscienceMathComplexRecCosh(num){
	return johnkscienceMathComplexRecDiv(
		johnkscienceMathComplexRecAdd(
			johnkscienceMathComplexRecExp(num),
			johnkscienceMathComplexRecExp(
				johnkscienceMathComplexRecMult('-1', num)
			)
		),
		'2'
	);
}

/*Υπολογίζει το tanh(z) , z in C */
function johnkscienceMathComplexRecTanh(num){
	return johnkscienceMathComplexRecDiv(
				johnkscienceMathComplexRecSinh(num),
				johnkscienceMathComplexRecCosh(num)
			);
}

/*Υπολογίζει το coth(z) , z in C */
function johnkscienceMathComplexRecCoth(num){
	return johnkscienceMathComplexRecDiv(
				johnkscienceMathComplexRecCosh(num),
				johnkscienceMathComplexRecSinh(num)
			);
}

/*Υπολογίζει το sech(z) , z in C */
function johnkscienceMathComplexRecSech(num){
	return johnkscienceMathComplexRecDiv(
				"1",
				johnkscienceMathComplexRecCosh(num)
			);
}

/*Υπολογίζει το csch(z) , z in C */
function johnkscienceMathComplexRecCsch(num){
	return johnkscienceMathComplexRecDiv(
				"1",
				johnkscienceMathComplexRecSinh(num)
			);
}

/*Υπολογίζει το ln(z) , z in C*    (S, N)->S 
  Πρωτεύον κλάδος του λογαρίθμου για k=0 
*/
function johnkscienceMathComplexRecLn(num,k){
	if(johnkscienceMathComplexRecIsZero(num)) return 'NaN';
	if(johnkscienceMathComplexRecIsEquals(num, '1')) return '0&0';
	
	let mod=johnkscienceMathComplexRecModulus(num);
	let arg=johnkscienceMathComplexRecArgument(num);
	
	mod=Number(johnkscienceMathScientificToScientific(mod));
	arg=Number(johnkscienceMathScientificToScientific(arg));
	
	let realRes=Math.log(mod);
	let imgRes=(arg+2*k*Math.PI);

	let res=''+realRes+_IMG_REC_CHAR+''+imgRes;
	res=johnkscienceMathComplexRecTo(res);
	//console.log("Ln", num,imgRes, res);
	return res;
}

/*Υπολογίζει το log(z) , z in C*   (S, N)->S
Πρωτεύον κλάδος του λογαρίθμου για k=0 
*/
function johnkscienceMathComplexRecLog(num,k){
	if(johnkscienceMathComplexRecIsZero(num)) return 'NaN';
	if(johnkscienceMathComplexRecIsEquals(num, '1&0')) return '0&0';
	
	return johnkscienceMathComplexRecDiv(
				johnkscienceMathComplexRecLn(num,k),
				johnkscienceMathComplexRecLn('10',k)
			);

}	

/*Υπολογίζει το loga(z) , z in C*   (S, S, N)->S
  που είναι ο λογάριθμος του z με βάση το a	
  Πρωτεύον κλάδος του λογαρίθμου για k=0 
  */
function johnkscienceMathComplexRecLoga(num,a,k){
	
	if(johnkscienceMathComplexRecIsZero(num)) return 'NaN';
	
	return johnkscienceMathComplexRecDiv(
				johnkscienceMathComplexRecLn(num,k),
				johnkscienceMathComplexRecLn(a,k)
			);

}

/*Υπολογίζει το asin(z) , z in C */
function johnkscienceMathComplexRecAsin(num){
	return johnkscienceMathComplexRecMult(
				johnkscienceMathComplexRecDiv('1', '&1'),
				johnkscienceMathComplexRecLn(
					johnkscienceMathComplexRecAdd(
						johnkscienceMathComplexRecMult('&1', ''+num),
						johnkscienceMathComplexRecMult(
							'1',
							johnkscienceMathComplexRecMult(
								johnkscienceMathComplexRecRoot(
									johnkscienceMathComplexRecModulus(
										johnkscienceMathComplexRecSub(
											'1',
											johnkscienceMathComplexRecMult(''+num, ''+num)
										)
									),2,0
								),
								johnkscienceMathComplexRecExp(
									johnkscienceMathComplexRecMult(
										johnkscienceMathComplexRecDiv('&1', '2'),
										johnkscienceMathComplexRecArgument(
											johnkscienceMathComplexRecSub(
												'1',
												johnkscienceMathComplexRecMult(''+num, ''+num)
											)
										)
									)
								)
							)
						)
					),0
				)
	);
}

/*Υπολογίζει το acos(z) , z in C */
function johnkscienceMathComplexRecAcos(num){
	return johnkscienceMathComplexRecMult(
				johnkscienceMathComplexRecDiv('1', '&1'),
				johnkscienceMathComplexRecLn(
					johnkscienceMathComplexRecAdd(
						''+num,
						johnkscienceMathComplexRecMult(
							'&1',
							johnkscienceMathComplexRecMult(
								johnkscienceMathComplexRecRoot(
									johnkscienceMathComplexRecModulus(
										johnkscienceMathComplexRecSub(
											'1',
											johnkscienceMathComplexRecMult(''+num, ''+num)
										)
									),2,0
								),
								johnkscienceMathComplexRecExp(
									johnkscienceMathComplexRecMult(
										johnkscienceMathComplexRecDiv('&1', '2'),
										johnkscienceMathComplexRecArgument(
											johnkscienceMathComplexRecSub(
												'1',
												johnkscienceMathComplexRecMult(''+num, ''+num)
											)
										)
									)
								)
							)
						)
					),0
				)
	);
}
	
/*Υπολογίζει το atan(z) , z in C */
function johnkscienceMathComplexRecAtan(num){
	
	//Δεν ορίζεται για num=+-i
	if(johnkscienceMathComplexRecIsEquals(''+num, '0&1')) return 'NaN';
	if(johnkscienceMathComplexRecIsEquals(''+num, '0&-1')) return 'NaN';
	
	return 	johnkscienceMathComplexRecMult(
				johnkscienceMathComplexRecDiv("1", "&2"),
				johnkscienceMathComplexRecLn(
					johnkscienceMathComplexRecDiv(
						johnkscienceMathComplexRecAdd(
							"1",
							johnkscienceMathComplexRecMult('&1', num)
						),
						johnkscienceMathComplexRecSub(
							'1',
							johnkscienceMathComplexRecMult('&1', num)
						)
					),
					0
				)
			);
					
}		

/*Υπολογίζει το acsc(z) , z in C* */
function johnkscienceMathComplexRecAcsc(num){
	
	
	if(johnkscienceMathComplexRecIsZero(num)) return 'NaN';
	
	return 	johnkscienceMathComplexRecAsin(
				johnkscienceMathComplexRecDiv('1', num)
			);
					
}		

/*Υπολογίζει το asec(z) , z in C* */
function johnkscienceMathComplexRecAsec(num){
	
	if(johnkscienceMathComplexRecIsZero(num)) return 'NaN';
	
	return 	johnkscienceMathComplexRecAcos(
				johnkscienceMathComplexRecDiv('1', num)
			);
					
}	

/*Υπολογίζει το acot(z) , z in C* */
function johnkscienceMathComplexRecAcot(num){
	
	if(johnkscienceMathComplexRecIsZero(num)) return 'Nan';
	
	return 	johnkscienceMathComplexRecAtan(
				johnkscienceMathComplexRecDiv('1', num)
			);
					
}

/*Υπολογίζει το asinh(z) , z in C */
function johnkscienceMathComplexRecAsinh(num){
	
		return	johnkscienceMathComplexRecLn(
					johnkscienceMathComplexRecAdd(
						johnkscienceMathComplexRecMult("1", num),
						johnkscienceMathComplexRecRoot(
							johnkscienceMathComplexRecAdd(
								"1",
								johnkscienceMathComplexRecMult(num, num),
							),
							2,
							0
						)
					),
					0
				);
}	
	
/*Υπολογίζει το acosh(z) , z in C */
function johnkscienceMathComplexRecAcosh(num){
	
	return			johnkscienceMathComplexRecLn(
					johnkscienceMathComplexRecAdd(
						johnkscienceMathComplexRecMult("1", num),
						johnkscienceMathComplexRecRoot(
							johnkscienceMathComplexRecSub(
								johnkscienceMathComplexRecMult(num, num),
								"1"
							),
							2,
							0
						)
					),
					0
				);
		
}		

/*Υπολογίζει το atanh(z) , z in C */
function johnkscienceMathComplexRecAtanh(num){
	
	return 	johnkscienceMathComplexRecMult(
				johnkscienceMathComplexRecDiv("1", "2"),
				johnkscienceMathComplexRecLn(
					johnkscienceMathComplexRecDiv(
						johnkscienceMathComplexRecAdd(
							"1",
							johnkscienceMathComplexRecMult('1', num)
						),
						johnkscienceMathComplexRecSub(
							'1',
							johnkscienceMathComplexRecMult('1', num)
						)
					),
					0
				)
			);
					
}		

/*Υπολογίζει το acsch(z) , z in C* */
function johnkscienceMathComplexRecAcsch(num){
	
	if(johnkscienceMathComplexRecIsZero(num)) return 'Nan&Nan';
	
	return 	johnkscienceMathComplexRecAsinh(
				johnkscienceMathComplexRecDiv('1', num)
			);
					
}		

/*Υπολογίζει το asech(z) , z in C* */
function johnkscienceMathComplexRecAsech(num){
	
	if(johnkscienceMathComplexRecIsZero(num)) return 'Nan&Nan';
	
	return 	johnkscienceMathComplexRecAcosh(
				johnkscienceMathComplexRecDiv('1', num)
			);
					
}	

/*Υπολογίζει το acoth(z) , z in C* */
function johnkscienceMathComplexRecAcoth(num){
	
	if(johnkscienceMathComplexRecIsZero(num)) return 'Nan&Nan';
	
	return 	johnkscienceMathComplexRecAtanh(
				johnkscienceMathComplexRecDiv('1', num)
			);
					
}

/*Μετατρέπει το όρισμα rad σε degree.
  Εάν ο μιγαδικός έχει μόνο πραγματικό μέρος τότε γίνεται
  η μετατροπή, αλλιώς ο μιγαδικός μένει όπως είναι.
*/
function johnkscienceMathComplexRecRadToDegree(rad){
	let degree;
	if(johnkscienceMathComplexRecIsReal(rad)){
		degree=johnkscienceMathComplexRecMult(
			''+rad,
			'5729577951308232_100000000000000'
		);
	}else{
		degree=rad;
	}
				
	return degree;
}

/*Μετατρέπει το όρισμα degree σε rad.
  Εάν ο μιγαδικός έχει μόνο πραγματικό μέρος τότε γίνεται
  η μετατροπή, αλλιώς ο μιγαδικός μένει όπως είναι.
*/
function johnkscienceMathComplexRecDegreeToRad(degree){
	
	if(johnkscienceMathComplexRecIsReal(degree)){
		switch(johnkscienceMathComplexRecReal(degree)) {
			case '0':
				return '0&0';
			case '90':
				return ''+(Math.PI/2)+'&0';
			case '180':
				return ''+(Math.PI)+'&0';
			case '270':
				return ''+(3*Math.PI/2)+'&0';
			case '360':
				return '0';
			default:
				return johnkscienceMathComplexRecMult(
							''+degree,
							'174532925199433_10000000000000000'
						);
		}
	}else{
		return degree;
	}
}

/*Μετατρέπει το όρισμα grad σε rad.
  Εάν ο μιγαδικός έχει μόνο πραγματικό μέρος τότε γίνεται
  η μετατροπή, αλλιώς ο μιγαδικός μένει όπως είναι.
  1 κύκλος = 400 rad
*/
function johnkscienceMathComplexRecGradToRad(grad){
	let rad;
	if(johnkscienceMathComplexRecIsReal(grad)){
		rad=johnkscienceMathComplexRecMult(
			''+grad,
			'1570796326794897_100000000000000000'
		);
	}else{
		rad=grad;
	}
				
	return rad;
}

/*Μετατρέπει το όρισμα rad σε grad.
  Εάν ο μιγαδικός έχει μόνο πραγματικό μέρος τότε γίνεται
  η μετατροπή, αλλιώς ο μιγαδικός μένει όπως είναι.
  1 κύκλος = 400 grad
*/
function johnkscienceMathComplexRecRadToGrad(rad){
	let grad;
	if(johnkscienceMathComplexRecIsReal(rad)){
		grad=johnkscienceMathComplexRecMult(
			''+rad,
			'6366197723675813_100000000000000'
		);
	}else{
		grad=rad;
	}
				
	return grad;
}

/*Υπολογίζει την z^a, a,z in C    
Πρωτεύον κλάδος της δύναμης για k=0 */
function johnkscienceMathComplexRecPow2(z, a){
	//0^0 --> NaN
	if(johnkscienceMathComplexRecIsZero(z) && 
	   johnkscienceMathComplexRecIsZero(a)){
		return 'NaN&NaN';
	}
	
	//0^n, n<0, n in Real --> NaN
	if(johnkscienceMathComplexRecIsZero(z) &&
		johnkscienceMathComplexRecIsReal(a) &&
		Number(johnkscienceMathScientificToScientific(johnkscienceMathComplexRecReal(a)))<0
		){
		return 'NaN&NaN';
	}
	
	//0^n, n>0, n in Real --> 0
	if(johnkscienceMathComplexRecIsZero(z) &&
		johnkscienceMathComplexRecIsReal(a) &&
		Number(johnkscienceMathScientificToScientific(johnkscienceMathComplexRecReal(a)))>0
		){
		return '0&0';
	}
	

	
	return johnkscienceMathComplexRecExp(
				johnkscienceMathComplexRecMult(
					johnkscienceMathComplexRecLn(z,0),
					a
				)
			);
}

/*Επιστρέφει true εάν ο z είναι ρίζα του πολυωνύμου mtrx,
  mtrx[len-1] είναι ο μεγιστοβάθμιος όρος του πολυωνύμου	

*/
function johnkscienceMathComplexRecIsPolyRoot(mtrx, z){

	let res='0';
	let len=mtrx.length;
	
	for(let i=0; i<len; i++){
		res=johnkscienceMathComplexRecAdd(
				johnkscienceMathComplexRecMult(
					johnkscienceMathComplexRecPow2(z,''+i),
					mtrx[i]
				),
				res
			);
	}
	
	//res=johnkscienceMathComplexRecApproxToZero(res, _APPROX_TO_ZERO); 
	
	if( johnkscienceMathComplexRecIsZero(res) ){
		return true;
	}else{
		return false;
	}

}

/*Επιστρέφει το ακέραιο μέρος ( Math.floor() ) του μέτρου του μιγαδικού.
	Επιστρέφει έναν θετικό ακέραιο ή μηδέν
*/
function johnkscienceMathComplexRecToInt(num){
	let res;
	if(johnkscienceMathScientificIsZero(johnkscienceMathComplexRecImg(num))){
		res=johnkscienceMathComplexRecReal(num);
	}else{
		res=johnkscienceMathComplexRecModulus(num);
	}
	res=johnkscienceMathScientificToScientific(''+res);
	res=Math.floor(Number(''+res));
	return ''+res;	
}

/*Υπολογίζει την συνάρτηση Γάμα με την μέθοδο του Lanczos Γ(z)*/
function johnkscienceMathComplexRecGammaLanczos(num){
	
	if(
	Number(
	johnkscienceMathScientificToScientific(
	johnkscienceMathComplexRecModulus(num)))>100){
		return 'NaN';
	}
		
	
	//Για αρνητικούς ακεραίους δεν ορίζεται
	if(
	johnkscienceMathComplexRecIsReal(num) &
	johnkscienceMathScientificIsInteger(johnkscienceMathComplexRecReal(num)) &
	Number(johnkscienceMathScientificToScientific(johnkscienceMathComplexRecReal(num)))<0
	){
		return 'NaN'
	}
	
	// 0!=1
	if(johnkscienceMathComplexRecIsZero(num)) return '1&0'
	
	let g = 8;
	let n = 12;
	let p = [
    '9999999999999999298_10000000000000000000',
    '19753739023578852322_10000000000000000',
    '-43973823927922428918_10000000000000000',
    '34626328459862717019_10000000000000000',
    '-11569851431631167820_10000000000000000',
    '15453815050252775060_100000000000000000',
    '-62536716123689161798_10000000000000000000',
    '34642762454736807441_1000000000000000000000',
    '-74776171974442977377_10000000000000000000E-7',
    '63041253821852264261_10000000000000000000E-8',
    '-27405717035683877489_10000000000000000000E-8',
    '40486948817567609101_10000000000000000000E-9'
]
	
	
	/*
	let g = 7;
	let n = 9;
	let p = [
    '99999999999980993_100000000000000000',
    '6765203681218851_10000000000000',
    '-12591392167224028_10000000000000',
    '77132342877765313_100000000000000',
    '-17661502916214059_100000000000000',
    '12507343278686905_1000000000000000',
    '-13857109526572012_100000000000000000',
    '99843695780195716_10000000000000000E-6',
    '15056327351493116_10000000000000000E-7'
	]
	*/
	
	let _EPSILON = 1e-07;
	
	function drop_imag(z){
	
		let mod=Number(johnkscienceMathScientificToScientific(
					johnkscienceMathComplexRecModulus(
						johnkscienceMathComplexRecImg(z)
					)
				));
				
		if (mod <= _EPSILON){
			z = johnkscienceMathComplexRecReal(z);
		}
		return z
	}
	
	function gamma(z){
		let y,x,t;
		if(Number(johnkscienceMathScientificToScientific(johnkscienceMathComplexRecReal(z)))<0.5){
			y=johnkscienceMathComplexRecDiv(
				'3141592653589793_1000000000000000',
				johnkscienceMathComplexRecMult(
					johnkscienceMathComplexRecSin(
						johnkscienceMathComplexRecMult(
							'3141592653589793_1000000000000000',
							''+z
						)
					),
					''+gamma(johnkscienceMathComplexRecSub('1', ''+z))
				)
			);
		}else{
			z=johnkscienceMathComplexRecSub(''+z, '1');
			x=p[0];
			for(let i=1; i<p.length; i++){
				x=johnkscienceMathComplexRecAdd(
					''+x,
					johnkscienceMathComplexRecDiv(
						''+p[i],
						johnkscienceMathComplexRecAdd(
							''+z,
							''+i
						)
					)
				);
			}
			t=johnkscienceMathComplexRecAdd(
				''+z,
				johnkscienceMathComplexRecAdd(
					''+g,
					'1_2'
				)
			);
			y=johnkscienceMathComplexRecMult(
				johnkscienceMathComplexRecRoot(
					johnkscienceMathComplexRecMult('2', '3141592653589793_1000000000000000'),
					2,0
				),
				johnkscienceMathComplexRecMult(
					johnkscienceMathComplexRecMult(
						johnkscienceMathComplexRecPow2(
							''+t,
							johnkscienceMathComplexRecAdd(
								''+z,
								'1_2'
							)
						),
						johnkscienceMathComplexRecExp(
							johnkscienceMathComplexRecSub('0',''+t)
						)
					),
					''+x
				)
			);
		}
		return ''+y;//drop_imag(''+y);
		//Για κάποιο λόγο προτείνεται στην 
		//https://en.wikipedia.org/wiki/Lanczos_approximation
		//να αποριφθεί το μιγαδικό μέρος όταν αυτό είναι μικρότερο 
		//από _EPSILON.
	}
	
	return gamma(''+num);
}

/*Υπολογίζει το παραγοντικό με την μέθοδο του Lanczos Γ(z-1)
 Υπολογίζει το παραγοντικό του πραγματικού μέρους του μιγαδικού
 num με την μέθοδο του Lanczos, για |num|<100
 
 π.χ. 0!=1, -2!=NaN, 3!=6, 3.1!=6,812, 100!=NaN
 */
function johnkscienceMathComplexRecFactorial(num){
	
	return johnkscienceMathComplexRecGammaLanczos(
				johnkscienceMathComplexRecAdd(
					johnkscienceMathComplexRecReal(num),
					'1'
				)
	);
	
}

/*Υπολογίζει το nCr, Combination, Συνδυασμοί*/
function johnkscienceMathComplexRecCombination(num1, num2){
	
	//Υπολογίζει των αριθμό των συνδυασμών
	let res=johnkscienceMathComplexRecDiv(
				johnkscienceMathComplexRecGammaLanczos(
					johnkscienceMathComplexRecAdd(''+num1,'1')
				),
				johnkscienceMathComplexRecMult(
					johnkscienceMathComplexRecGammaLanczos(
						johnkscienceMathComplexRecAdd(''+num2, '1')
					),
					johnkscienceMathComplexRecGammaLanczos(
						johnkscienceMathComplexRecAdd(
							johnkscienceMathComplexRecSub(''+num1, ''+num2),
							'1'
						)
					)
				)
	);
	
	return res;
				

}

/*Υπολογίζει το nPr, Permutations , Μεταθέσεις*/
function johnkscienceMathComplexRecPermutations(num1, num2){
	
	return johnkscienceMathComplexRecMult( 
				johnkscienceMathComplexRecCombination(num1, num2),
				johnkscienceMathComplexRecGammaLanczos(
					johnkscienceMathComplexRecAdd(''+num2,'1')
				)
	);

}

/*Επιστρέφει τον πλησιέστερο μικρότερο μιγαδικό ακέραιο,
  Ορίζουμε ως μιγαδικό ακέραιο τον μιγαδικό που αποτελείται
  από ακέραιο πραγματικό και φανταστικό μέρος. 
  
  Έστω z=a+b*i μιγαδικός ακέραιος, όταν α,β in Ζ
  
  Στο πρώτο τεταρτημόριο,
  
  έστω z=α+β*i ένας τυχαίος μιγαδικός αριθμός. Υπάρχουν 
  τέσσερις πλησιέστεροι μιγαδικοί ακέραιοι γύρω από αυτόν:
  
  q1=floor(a)+floor(b)*i, κάτω και αριστερά
  q2=ceil(a)+floor(b)*i, κάτω και δεξιά 
  q3=ceil(a)+ceil(b)*i, πάνω και δεξιά
  q4=floor(a)+ceil(b)*i, πάνω και αριστερά
  
  Αυτή η συνάρτηση επιστρέφει τον q1, τον πλησιέστερο προς το μηδέν
  
  Στο δεύτερο, τρίτο και τέταρτο τεταρτημόριο επιστρέφει τους
  q2, q3, q4 αντίστοιχα. 
  
*/
function johnkscienceMathComplexRecFloor(num){
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	real=johnkscienceMathScientificToScientific(real);
	img=johnkscienceMathScientificToScientific(img);
	
	let nr=Number(real);
	let ni=Number(img);
	
	if(nr>=0 && ni>=0){
		return johnkscienceMathScientificFloor(real)+'&'+johnkscienceMathScientificFloor(img);
	}else if(nr<=0 && ni>=0){
		return johnkscienceMathScientificCeil(real)+'&'+johnkscienceMathScientificFloor(img);
	}else if(nr<=0 && ni<=0){
		return johnkscienceMathScientificCeil(real)+'&'+johnkscienceMathScientificCeil(img);
	}else if(nr>=0 && ni<=0){
		return johnkscienceMathScientificFloor(real)+'&'+johnkscienceMathScientificCeil(img);
	}
}

/*Επιστρέφει τον πλησιέστερο μεγαλύτερο μιγαδικό ακέραιο,
  Ορίζουμε ως μιγαδικό ακέραιο τον μιγαδικό που αποτελείται
  από ακέραιο πραγματικό και φανταστικό μέρος. 
  
  Έστω z=a+b*i μιγαδικός ακέραιος, όταν α,β in Ζ
  
  Στο πρώτο τεταρτημόριο,
  
  έστω z=α+β*i ένας τυχαίος μιγαδικός αριθμός. Υπάρχουν 
  τέσσερις πλησιέστεροι μιγαδικοί ακέραιοι γύρω από αυτόν:
  
  q1=floor(a)+floor(b)*i, κάτω και αριστερά
  q2=ceil(a)+floor(b)*i, κάτω και δεξιά 
  q3=ceil(a)+ceil(b)*i, πάνω και δεξιά
  q4=floor(a)+ceil(b)*i, πάνω και αριστερά
  
  Αυτή η συνάρτηση επιστρέφει τον q3, τον μακρόθεν προς το μηδέν
  
  Στο δεύτερο, τρίτο και τέταρτο τεταρτημόριο επιστρέφει τους
  q2, q3, q4 αντίστοιχα. 
  
*/
function johnkscienceMathComplexRecCeil(num){
	let real=johnkscienceMathComplexRecReal(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	real=johnkscienceMathScientificToScientific(real);
	img=johnkscienceMathScientificToScientific(img);
	
	let nr=Number(real);
	let ni=Number(img);
	
	if(nr>=0 && ni>=0){
		return johnkscienceMathScientificCeil(real)+'&'+johnkscienceMathScientificCeil(img);
	}else if(nr<=0 && ni>=0){
		return johnkscienceMathScientificFloor(real)+'&'+johnkscienceMathScientificCeil(img);
	}else if(nr<=0 && ni<=0){
		return johnkscienceMathScientificFloor(real)+'&'+johnkscienceMathScientificFloor(img);
	}else if(nr>=0 && ni<=0){
		return johnkscienceMathScientificCeil(real)+'&'+johnkscienceMathScientificFloor(img);
	}
}

/*Επιστρέφει τον πλησιέστερο μιγαδικό ακέραιο,
  Ορίζουμε ως μιγαδικό ακέραιο τον μιγαδικό που αποτελείται
  από ακέραιο πραγματικό και φανταστικό μέρος. 
  
  Έστω z=a+b*i μιγαδικός ακέραιος, όταν α,β in Ζ
  
  Έστω z=α+β*i ένας τυχαίος μιγαδικός αριθμός. Υπάρχουν 
  τέσσερις πλησιέστεροι μιγαδικοί ακέραιοι γύρω από αυτόν:
  
  q1=floor(a)+floor(b)*i, κάτω και αριστερά
  q2=ceil(a)+floor(b)*i, κάτω και δεξιά 
  q3=ceil(a)+ceil(b)*i, πάνω και δεξιά
  q4=floor(a)+ceil(b)*i, πάνω και αριστερά
  
  Αυτή η συνάρτηση επιστρέφει τον q=round(a)+round(b)*i
*/
function johnkscienceMathComplexRecRound(num){
	let real=johnkscienceMathComplexRec(num);
	let img=johnkscienceMathComplexRecImg(num);
	
	real=johnkscienceMathScientificRound(real);
	img=johnkscienceMathScientificRound(img);
	
	return real+'&'+img;
}

/*Υπολογίζει το υπόλοιπο της Ευκλείδειας διαίρεσης,
  (Διαιρετέος / διαιρέτης) σύμφωνα με τον παρακάτω αλγόριθμο.
  
  1) πηλίκο = Διαιρετέος / διαιρέτης
  2) Αντικαθιστώ το πηλίκο με τον πλησιέστερο προς τα κάτω (floor) 
     μιγαδικό ακέραιο, βλέπε johnkscienceMathComplexRecFloor
  3) υπόλοιπο = Διαιρετέος - πηλίκο * διαιρέτης
	
*/
function johnkscienceMathComplexRecReminder(lhs, rhs){
	let quotient=johnkscienceMathComplexRecDiv(lhs, rhs);
	quotient=johnkscienceMathComplexRecFloor(quotient);
	let remainder=johnkscienceMathComplexRecSub(
					lhs,
					johnkscienceMathComplexRecMult(
						quotient,
						rhs
					)
	);
	return remainder;
}

/*Υπολογίζει το πηλίκο της Ευκλείδειας διαίρεσης,
	(Διαιρετέος / διαιρέτης) σύμφωνα με τον παρακάτω αλγόριθμο.
  
  1) πηλίκο = Διαιρετέος / διαιρέτης
  2) Αντικαθιστώ το πηλίκο με τον πλησιέστερο προς τα κάτω (floor) 
     μιγαδικό ακέραιο, βλέπε johnkscienceMathComplexRecFloor
  3) υπόλοιπο = Διαιρετέος - πηλίκο * διαιρέτης
	
*/
function johnkscienceMathComplexRecQuotient(lhs, rhs){
	let quotient=johnkscienceMathComplexRecDiv(lhs, rhs);
	quotient=johnkscienceMathComplexRecFloor(quotient);
	let remainder=johnkscienceMathComplexRecSub(
					lhs,
					johnkscienceMathComplexRecMult(
						quotient,
						rhs
					)
	);
	return quotient;
}

/*Επιστρέφει έναν τυχαίο μιγαδικό αριθμό*/
function johnkscienceMathComplexRecRandom(){
	return ''+Math.random()+_IMG_REC_CHAR+(Math.random());
}

/*Μετατρέπει τον μιγαδικό από πολική σε ορθογώνια μορφή*/
function johnkscienceMathComplexRecPolar(mod, arg){
	let real=johnkscienceMathComplexRecMult(
				mod,
				johnkscienceMathComplexRecCos(arg)
	);
	let img=johnkscienceMathComplexRecMult(
				mod,
				johnkscienceMathComplexRecSin(arg)
	);
	real=johnkscienceMathComplexRecReal(real);
	img=johnkscienceMathComplexRecReal(img);
	return ''+real+'&'+img;
}


/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%         ΠΙΝΑΚΕΣ (ROW MATRIX)         %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Οι παρακάτω συναρτήσεις χειρίζονται πίνακες μίας γραμμής.
  Οι πίνακες αυτοί μπορεί να αντιπροσωπεύουν και πίνακες 
  δύο διαστάσεων, με την βοήθεια της διάστασης dim, όπου 
  είναι ο αριθμός των στηλών σε κάθε γραμμή.
  
  π.χ. ο πίνακας 
  
  ['1', '2', '3', '4', '5', '6'] 
  
  με dim=2 είναι ίδιος με τον πίνακα
  
  [['1', '2'],['3', '4'], ['5', '6']]
  
  Στις παρακάτω συναρτήσεις ο πρώτος δείκτης (i) είναι ο δείκτης 
  των γραμμών και ο δεύτερος (j) των στηλών
  
  Τα στοιχεία κάθε πίνακα μπορεί να είναι μιγαδικοί, εκτός και αν
  ορίζεται να είναι πραγματικοί.
  
  Η εσωτερική αναπαράσταση είναι ένας μονοδιάστατος πίνακας.
  */

/*Επιστρέφει το κελί i ,j    ([], N, N, N) --> S 
  Δεν γίνεται έλεγχος ορίων. Η αρίθμηση αρχίζει από το 0	*/
function johnkscienceMathMatrixCell(mtrx, i, j, dim){
	
	return mtrx[i*dim+j];

}

/*Επιστρέφει τον αριθμό των γραμμών ([], N) --> Ν */
function johnkscienceMathMatrixRows(mtrx, dim){
	
	if(johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)){
		return mtrx.length/dim;
	}else{
		return 'NaN';
	}
	
}

/*Επιστρέφει τον αριθμό των στηλών ([], N) --> Ν */
function johnkscienceMathMatrixCols(mtrx, dim){
	
	if(johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)){
		return dim;
	}else{
		return 'NaN';
	}
	
}

/*Επιστρέφει true εάν ο πίνακας είναι δισδιάστατος. ([], N) --> Ν */
function johnkscienceMathMatrixIsTwoDimentional(mtrx, dim){
	if(Number.isInteger(mtrx.length/dim)) {
		return true;
	}else{
		return false;
	}
}

/*Επιστρέφει true εάν οι πίνακες είναι ίσοι*/
function johnkscienceMathMatrixIsEquals(mtrx1, dim1, mtrx2, dim2){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx1, dim1)) return false;
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx2, dim2)) return false;

	let rows1=johnkscienceMathMatrixRows(mtrx1, dim1);
	let cols1=johnkscienceMathMatrixCols(mtrx1, dim1);
	let rows2=johnkscienceMathMatrixRows(mtrx2, dim2);
	let cols2=johnkscienceMathMatrixCols(mtrx2, dim2);
	//Οι πίνακες πρέπει να έχουν ίσες διαστάσεις διαστάσεις [m x n] και [m x n]
	if(cols1!=cols2 || rows1!=rows2) return false;
	
	for(let i=0; i<rows1; i++){
		for(let j=0; j<cols1; j++){
			if( !johnkscienceMathComplexRecIsEquals(
					johnkscienceMathMatrixCell(mtrx1, i, j, dim1),
					johnkscienceMathMatrixCell(mtrx2, i, j, dim2))) return false;
		}
	}
	return true;
}

/*Επιστρέφει true εάν ο τετρ. πίνακας είναι μοναδιαίος*/
function johnkscienceMathMatrixIsIdentity(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	//Ο πίνακας πρέπει να είναι τετράγωνος
	if(cols!=rows ) return false;
	
	if(!johnkscienceMathMatrixIsEquals(
			mtrx, dim,
			johnkscienceMathMatrixIdentity(dim), dim)) return false;

	return true;
}

/*Επιστρέφει true εάν ο τετρ. πίνακας είναι διαγώνιος*/
function johnkscienceMathMatrixIsDiagonal(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	//Ο πίνακας πρέπει να είναι τετράγωνος
	if(cols!=rows ) return false;
	
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			if(i!=j){
				if(!johnkscienceMathComplexRecIsZero(
				johnkscienceMathMatrixCell(mtrx, i, j, dim))){
					return false;
				}
			}
		}
	}
	
	return true;
}

/*Επιστρέφει true εάν ο τετρ. πίνακας είναι διαγώνια ορισμένος

|aii| >= Sum( |aij| )

*/
function johnkscienceMathmatrixIsDiagonallyDominant(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	//Ο πίνακας πρέπει να είναι τετράγωνος
	if(cols!=rows ) return false;
	let sum;
	
	for(let i=0; i<rows; i++){
		sum='0';
		for(let j=0; j<cols; j++){
			if(i!=j){
				sum=johnkscienceMathComplexRecAdd(
						sum,
						johnkscienceMathComplexRecModulus(
							johnkscienceMathMatrixCell(mtrx, i, j, dim)
						)
					);
			}
		}
		
		if(  
			Number(
				johnkscienceMathScientificToScientific(
					johnkscienceMathComplexRecModulus(
						johnkscienceMathMatrixCell(mtrx, i, i, dim)
					)
				)
			)
			<
			Number(
				johnkscienceMathScientificToScientific(
					johnkscienceMathComplexRecModulus(
						sum
					)
				)
			)
		){
			return false;
		}
		
		
	}
	
	return true;


}

/*Επιστρέφει true εάν ο τετρ. πίνακας είναι διαγώνια ορισμένος
	
|aii| > Sum( |aij| )

*/
function johnkscienceMathmatrixIsStrictlyDiagonallyDominant(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	//Ο πίνακας πρέπει να είναι τετράγωνος
	if(cols!=rows ) return false;
	let sum;
	
	for(let i=0; i<rows; i++){
		sum='0';
		for(let j=0; j<cols; j++){
			if(i!=j){
				sum=johnkscienceMathComplexRecAdd(
						sum,
						johnkscienceMathComplexRecModulus(
							johnkscienceMathMatrixCell(mtrx, i, j, dim)
						)
					);
			}
		}
		
		if(  
			Number(
				johnkscienceMathScientificToScientific(
					johnkscienceMathComplexRecModulus(
						johnkscienceMathMatrixCell(mtrx, i, i, dim)
					)
				)
			)
			<=
			Number(
				johnkscienceMathScientificToScientific(
					johnkscienceMathComplexRecModulus(
						sum
					)
				)
			)
		){
			return false;
		}
		
		
	}
	
	return true;


}

/*Επιστρέφει true εάν ο πίνακας περιέχει θετικούς πραγματικούς αριθμούς */
function johnkscienceMathmatrixIsPositive(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			if(  
				!johnkscienceMathComplexRecIsReal(
					johnkscienceMathMatrixCell(mtrx, i, j, dim)
				)
				||
				Number(
					johnkscienceMathScientificToScientific(
						johnkscienceMathComplexRecReal(
							johnkscienceMathMatrixCell(mtrx, i, j, dim)
						)
					)
				)<=0
			){
				return false;
			}
		}
	}
	
	return true;



}

/*Επιστρέφει true εάν ο πίνακας περιέχει μη αρνητικούς πραγματικούς αριθμούς */
function johnkscienceMathmatrixIsNonNegative(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			if(  
				!johnkscienceMathComplexRecIsReal(
					johnkscienceMathMatrixCell(mtrx, i, j, dim)
				)
				||
				Number(
					johnkscienceMathScientificToScientific(
						johnkscienceMathComplexRecReal(
							johnkscienceMathMatrixCell(mtrx, i, j, dim)
						)
					)
				)<0
			){
				return false;
			}
		}
	}
	
	return true;



}

/*Επιστρέφει true εάν ο τετρ. πίνακας είναι συμμετρικός
  δηλαδή αν ΑΤ=Α */
function johnkscienceMathmatrixIsSymmetric(mtrx, dim){
	
	if(johnkscienceMathMatrixIsEquals(
			mtrx, dim,
			johnkscienceMathMatrixTranspose(mtrx, dim), dim
		)
	){
		return true;
	}else{
		return false;
	}

}

/*Επιστρέφει true εάν ο τετρ. πίνακας είναι αντι-συμμετρικός
  δηλαδή αν ΑΤ=-Α*/
function johnkscienceMathmatrixIsSkewSymmetric(mtrx, dim){
	
	if(johnkscienceMathMatrixIsEquals(
			mtrx, 
			dim,
			johnkscienceMathMatrixOpposite(
				johnkscienceMathMatrixTranspose(mtrx, dim), 
				dim), 
			dim
		)
	){
		return true;
	}else{
		return false;
	}

}

/*Επιστρέφει true εάν ο τετρ. πίνακας είναι Ερμιτιανός
  δηλαδή αν conj(ΑΤ)=Α*/
function johnkscienceMathmatrixIsHermitian(mtrx, dim){
	
	if(johnkscienceMathMatrixIsEquals(
			mtrx, dim,
			johnkscienceMathMatrixConjugateTranspose(mtrx, dim), dim
		)
	){
		return true;
	}else{
		return false;
	}

}

/*Επιστρέφει true εάν ο τετρ. πίνακας είναι αντι-Ερμιτιανός
	δηλαδή αν conj(ΑΤ)=-Α*/
function johnkscienceMathmatrixIsSkewHermitian(mtrx, dim){
	
	if(johnkscienceMathMatrixIsEquals(
			mtrx, 
			dim,
			johnkscienceMathMatrixOpposite(
				johnkscienceMathMatrixConjugateTranspose(mtrx, dim), 
				dim), 
			dim
		)
	){
		return true;
	}else{
		return false;
	}

}

/*Επιστρέφει πίνακα χωρίς την (i,j) γραμμή, στήλη ([], N, N, N) --> []
  Ο νέος πίνακας έχει διάσταση dim-1. Δεν γίνεται έλεγχος ορίων*/
function johnkscienceMathMatrixCopyExcludeRowCol(mtrx, i, j, dim){
	
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';
	
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let res=[];
	for(let k=0; k<rows; k++){
		for(let z=0; z<cols; z++){
			if(i==k || j==z){
				;
			}else{
				res.push(johnkscienceMathMatrixCell(mtrx, k, z, dim));
			}
		}
	}
	return res;
}

/*Επιστρέφει πίνακα χωρίς την  i γραμμή ([], N, N) --> []
  Ο νέος πίνακας έχει διάσταση dim. Δεν γίνεται έλεγχος ορίων*/
function johnkscienceMathMatrixCopyExcludeRow(mtrx, i, dim){
	
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';
	
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let res=[];
	for(let k=0; k<rows; k++){
		for(let z=0; z<cols; z++){
			if(i==k){
				;
			}else{
				res.push(johnkscienceMathMatrixCell(mtrx, k, z, dim));
			}
		}
	}
	return res;
}

/*Επιστρέφει πίνακα χωρίς την  j στήλη ([], N, N) --> []
  Ο νέος πίνακας έχει διάσταση dim-1. Δεν γίνεται έλεγχος ορίων*/
function johnkscienceMathMatrixCopyExcludeCol(mtrx, j, dim){
	
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';
	
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let res=[];
	for(let k=0; k<rows; k++){
		for(let z=0; z<cols; z++){
			if(j==z){
				;
			}else{
				res.push(johnkscienceMathMatrixCell(mtrx, k, z, dim));
			}
		}
	}
	return res;
}

/*Επιστρέφει τον μοναδιαίο τετράγωνο πίνακα με διάσταση dim*/
function johnkscienceMathMatrixIdentity(dim){
	let res=[];
	for(let k=0; k<dim; k++){
		for(let z=0; z<dim; z++){
			if(k==z){
				res.push('1');
			}else{
				res.push('0');
			}
		}
	}
	return res;
}

/*Επιστρέφει τον μηδενικό πίνακα με διαστάσεις dim1, dim2*/
function johnkscienceMathMatrixZero(dim1, dim2){
	let res=[];
	for(let k=0; k<dim1; k++){
		for(let z=0; z<dim2; z++){
			res.push('0');
		}
	}
	return res;
}

/*Πολλαπλασιάζει δύο πίνακες [m x n]*[n x z] 
  με διαστάσεις dim1, dim2. Ο νέος πίνακας έχει διαστάσεις 
  [m x z] ή dim2
  Δεν γίνεται έλεγχος ορίων. Τα στοιχεία των πινάκων μπορεί να είναι 
  και μιγαδικοί.
*/
function johnkscienceMathMatrixMult(mtrx1, dim1, mtrx2, dim2){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx1, dim1)) return 'NaN';
	
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx2, dim2)) return 'NaN';

	let rows1=johnkscienceMathMatrixRows(mtrx1, dim1);
	let cols1=johnkscienceMathMatrixCols(mtrx1, dim1);
	let rows2=johnkscienceMathMatrixRows(mtrx2, dim2);
	let cols2=johnkscienceMathMatrixCols(mtrx2, dim2);
	//Οι πίνακες πρέπει να έχουν διαστάσεις [m x n] και [n x p]
	if(cols1!=rows2) return 'NaN';
	
	let res=[];
	let elm;
	
	for(let i=0; i<rows1; i++){
		for(let j=0; j<cols2; j++){
			elm='0';
			for(let k=0; k<cols1; k++){
				elm=johnkscienceMathComplexRecAdd(
					johnkscienceMathComplexRecMult(
						johnkscienceMathMatrixCell(mtrx1, i, k, dim1),
						johnkscienceMathMatrixCell(mtrx2, k, j, dim2)
					),
					elm
				);
			}
			res.push(elm);
		}
	}
	return res;

}

/*Πολλαπλασιάζει αριθμό με πίνακα λ*[m x n] , Scalar multiplication
  με διαστάση dim. Ο νέος πίνακας έχει διαστάσεις 
  [m x n] ή dim
  Δεν γίνεται έλεγχος ορίων. Τα στοιχεία των πινάκων μπορεί να είναι 
  και μιγαδικοί.
*/
function johnkscienceMathMatrixScalarMult(num, mtrx, dim){
	
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	
	let res=[];
	
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			res.push(
				johnkscienceMathComplexRecMult(
						''+num,
						johnkscienceMathMatrixCell(mtrx, i, j, dim)
					)
			);
		}
	}
	return res;

}

/*Προσθέτει δύο πίνακες [m x n]+[m x n] 
  με διαστάσεις dim1, dim2. Ο νέος πίνακας έχει διαστάσεις 
  [m x n] ή dim2=dim2
  Δεν γίνεται έλεγχος ορίων. Τα στοιχεία των πινάκων μπορεί να είναι 
  και μιγαδικοί.
*/
function johnkscienceMathMatrixAdd(mtrx1, dim1, mtrx2, dim2){
	
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx1, dim1)) return 'NaN';
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx2, dim2)) return 'NaN';

	let rows1=johnkscienceMathMatrixRows(mtrx1, dim1);
	let cols1=johnkscienceMathMatrixCols(mtrx1, dim1);
	let rows2=johnkscienceMathMatrixRows(mtrx2, dim2);
	let cols2=johnkscienceMathMatrixCols(mtrx2, dim2);
	
	//Οι πίνακες πρέπει να έχουν ίδιες διαστάσεις [m x n] και [m x n]
	if(cols1!=cols2 || rows1!=rows2) return 'NaN';
	
	let res=[];
	
	for(let i=0; i<rows1; i++){
		for(let j=0; j<cols2; j++){
			res.push(
				johnkscienceMathComplexRecAdd(
						johnkscienceMathMatrixCell(mtrx1, i, j, dim1),
						johnkscienceMathMatrixCell(mtrx2, i, j, dim2)
					)
			);
		}
	}
	return res;

}

/*Προσθέτει αριθμό με πίνακα λ+[m x n] 
  με διαστάση dim. Ο νέος πίνακας έχει διαστάσεις 
  [m x n] ή dim
  Δεν γίνεται έλεγχος ορίων. Τα στοιχεία των πινάκων μπορεί να είναι 
  και μιγαδικοί.
*/
function johnkscienceMathMatrixScalarAdd(num, mtrx, dim){
	
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	
	let res=[];
	
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			res.push(
				johnkscienceMathComplexRecAdd(
						''+num,
						johnkscienceMathMatrixCell(mtrx, i, j, dim)
					)
			);
		}
	}
	return res;

}

/*Αφαιρεί δύο πίνακες [m x n]-[m x n] 
  με διαστάσεις dim1, dim2. Ο νέος πίνακας έχει διαστάσεις 
  [m x n] ή dim2=dim2
  Δεν γίνεται έλεγχος ορίων. Τα στοιχεία των πινάκων μπορεί να είναι 
  και μιγαδικοί.
*/
function johnkscienceMathMatrixSub(mtrx1, dim1, mtrx2, dim2){
	
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx1, dim1)) return 'NaN';
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx2, dim2)) return 'NaN';

	let rows1=johnkscienceMathMatrixRows(mtrx1, dim1);
	let cols1=johnkscienceMathMatrixCols(mtrx1, dim1);
	let rows2=johnkscienceMathMatrixRows(mtrx2, dim2);
	let cols2=johnkscienceMathMatrixCols(mtrx2, dim2);
	
	//Οι πίνακες πρέπει να έχουν ίδιες διαστάσεις [m x n] και [m x n]
	if(cols1!=cols2 || rows1!=rows2) return 'NaN';
	
	let res=[];
	
	for(let i=0; i<rows1; i++){
		for(let j=0; j<cols2; j++){
			res.push(
				johnkscienceMathComplexRecSub(
						johnkscienceMathMatrixCell(mtrx1, i, j, dim1),
						johnkscienceMathMatrixCell(mtrx2, i, j, dim2)
					)
			);
		}
	}
	return res;

}

/*Υπολογίζει το ίχνος trace ενός τετράγωνου πίνακα */
function johnkscienceMathMatrixTrace(mtrx, dim){
	
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	
	//Ο πίνακας πρέπει να είναι τετράγωνος
	if(cols!=rows) return 'NaN';
	
	let res='0';
	
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			if(i==j){
				res = 
					johnkscienceMathComplexRecAdd(
							johnkscienceMathMatrixCell(mtrx, i, j, dim),
							res
						);
			}
		}
	}
	return res;

}
	
/*Κατασκευάζει διαγώνιο τετράγωνο πίνακα με την κύρια διαγώνιο να 
  περιέχει τα στοιχεία του πίνακα mtrx. Η διάσταση αυτού του πίνακα
  είναι όση και η διάσταση της διαγωνίου
*/
function johnkscienceMathMatrixDiagonal(mtrx){
	let dim=mtrx.length;
	
	let res=[];
	
	for(let i=0; i<dim; i++){
		for(let j=0; j<dim; j++){
			if(i==j){
				res.push(johnkscienceMathMatrixCell(mtrx,0,j,dim));
			}else{
				res.push('0');
			}
		}
	}
	return res;
	
}

/*Κατασκευάζει τον αντίθετο του mtrx*/ 
function johnkscienceMathMatrixOpposite(mtrx, dim){
	
	return johnkscienceMathMatrixScalarMult('-1', mtrx, dim);
	
}

/*Υπολογίζει την δύναμη ενός τετρ. πίνακα Α^n=A*A*..., n in N  ([],N,N)->[]*/
function johnkscienceMathMatrixPow(mtrx, dim, n){
	
	if(n<0) return 'NaN';
	if(!Number.isInteger(n)) return 'NaN';
	
	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows!=cols) return false;

	if(n==0) return johnkscienceMathMatrixIdentity(dim);
	if(n==1) return mtrx;

	let res=mtrx;
	for(let i=2; i<=n; i++){
		res=johnkscienceMathMatrixMult(res, dim, mtrx, dim);
	}
	return res;

}

/*Επιστρέφει πίνακα με τα στοιχεία του υψωμένα στην δύναμη n ([], Ν, S)->S
  Ο πίνακας μπορεί να είναι όποιας διάστασης και ο n μιγαδικός
  Δεν γίνεται έλεγχος λαθών. Τα στοιχεία του πίνακα μπορεί να 
  είναι μιγαδικοί.*/
function johnkscienceMathMatrixScalarPow(num, mtrx, dim){ 
	//Ο πίνακας πρέπει να είναι δισδιάστατος
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	
	let res=[];
	
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			res.push(
				johnkscienceMathComplexRecPow2(
						johnkscienceMathMatrixCell(mtrx, i, j, dim),
						num
				)
			);
		}
	}
	return res;
}

/*Επιστρέφει τον ανάστροφο πίνακα ΑΤ. 
  Η  διάσταση του ανάστροφου είναι ίση με τον αριθμό των γραμμών
  του αρχικού. 
*/
function johnkscienceMathMatrixTranspose(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	let res=[];
	for(let j=0; j<cols; j++){
		for(let i=0; i<rows; i++){
			res.push(johnkscienceMathMatrixCell(mtrx, i, j, dim));
		}
	}
	
	return res;
}

/*Επιστρέφει τον συζυγή πίνακα conj(A).  
*/
function johnkscienceMathMatrixConjugate(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	let res=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			res.push(
				johnkscienceMathComplexRecConjugate(
					johnkscienceMathMatrixCell(mtrx, i, j, dim)
				)
			);
		}
	}
	
	return res;
}

/*Επιστρέφει τον συζυγή ανάστροφο πίνακα conj(ΑΤ). 
  Η  διάσταση του ανάστροφου είναι ίση με τον αριθμό των γραμμών
  του αρχικού. 
*/
function johnkscienceMathMatrixConjugateTranspose(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	let res=[];
	for(let j=0; j<cols; j++){
		for(let i=0; i<rows; i++){
			res.push(
				johnkscienceMathComplexRecConjugate(
					johnkscienceMathMatrixCell(mtrx, i, j, dim)
				)
			);
		}
	}
	
	return res;
}

/*Επιστρέφει τον τετρ. άνω τριγωνικό πίνακα */
function johnkscienceMathMatrixUpperTriangular(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows!=cols) return false;

	let res=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			if(i>j){
				res.push('0');
			}else{
				res.push(johnkscienceMathMatrixCell(mtrx, i, j, dim));
			}
		}
	}
	
	return res;
}

/*Επιστρέφει τον τετρ. αυστηρά άνω τριγωνικό πίνακα */
function johnkscienceMathMatrixStrictlyUpperTriangular(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows!=cols) return false;
	
	let res=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			if(i>=j){
				res.push('0');
			}else{
				res.push(johnkscienceMathMatrixCell(mtrx, i, j, dim));
			}
		}
	}
	
	return res;
}

/*Επιστρέφει τον τετρ. κάτω τριγωνικό πίνακα */
function johnkscienceMathMatrixLowerTriangular(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows!=cols) return false;
	
	let res=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			if(i<j){
				res.push('0');
			}else{
				res.push(johnkscienceMathMatrixCell(mtrx, i, j, dim));
			}
		}
	}
	
	return res;
}

/*Επιστρέφει τον τετρ. αυστηρά κάτω τριγωνικό πίνακα */
function johnkscienceMathMatrixStrictlyLowerTriangular(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows!=cols) return false; 
	
	let res=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			if(i<=j){
				res.push('0');
			}else{
				res.push(johnkscienceMathMatrixCell(mtrx, i, j, dim));
			}
		}
	}
	
	return res;
}

/*Επιστρέφει την ορίζουσα του τετρ. πίνακα */
function johnkscienceMathMatrixDeterminant(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows!=cols) return 'NaN'; 
	if(rows==0) return 'NaN';
	
	let res;
	
	if(mtrx.length==1) return johnkscienceMathMatrixCell(mtrx, 0, 0, dim);
	
	if(mtrx.length==4){
		return johnkscienceMathComplexRecSub(
					johnkscienceMathComplexRecMult(
						johnkscienceMathMatrixCell(mtrx, 0, 0, dim),
						johnkscienceMathMatrixCell(mtrx, 1, 1, dim)
					),
					johnkscienceMathComplexRecMult(
						johnkscienceMathMatrixCell(mtrx, 0, 1, dim),
						johnkscienceMathMatrixCell(mtrx, 1, 0, dim)
					)
				);
	}else{
		res='0';
		for(let i=0; i<rows; i++){
			res=johnkscienceMathComplexRecAdd(
				res,
				johnkscienceMathComplexRecMult(
					johnkscienceMathComplexRecPow2('-1', ''+i),
					johnkscienceMathComplexRecMult(
						johnkscienceMathMatrixCell(mtrx, i, 0, dim),
						johnkscienceMathMatrixDeterminant(
							johnkscienceMathMatrixCopyExcludeRowCol(mtrx,i,0,dim),
							dim-1
						)
					)
				)
			);
		}
	}
	return res;

}

/*Επιστρέφει το αλγεβρικό συμπλήρωμα του τετρ. πίνακα */
function johnkscienceMathMatrixCofactor(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows!=cols) return 'NaN'; 
	if(rows==0) return 'NaN';
	
	let res;
	
	if(mtrx.length==1) return 'NaN';

	res=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			res.push(
				johnkscienceMathComplexRecMult(
					johnkscienceMathComplexRecPow2('-1', ''+(i+j)),
					johnkscienceMathMatrixDeterminant(
						johnkscienceMathMatrixCopyExcludeRowCol(mtrx,i,j,dim),
						dim-1
					)
				)
			);
		}
	}
	
	return res;
}

/*Επιστρέφει τον συμπληρωματικό του τετρ. πίνακα */
function johnkscienceMathMatrixAdjugate(mtrx, dim){
	
	return johnkscienceMathMatrixTranspose(
				johnkscienceMathMatrixCofactor(mtrx, dim),
				dim
			);
}

/*Επιστρέφει τον αντίστροφο του τετρ. πίνακα */
function johnkscienceMathMatrixInverse(mtrx, dim){
	
	let det=johnkscienceMathMatrixDeterminant(mtrx, dim);
	if(johnkscienceMathComplexRecIsZero(det)) return 'NaN';
	
	return johnkscienceMathMatrixScalarMult(
				johnkscienceMathComplexRecInverse(det),
				johnkscienceMathMatrixAdjugate(mtrx, dim),
				dim
			);
			
}
	
/*Επίλυση κατά Cramer γραμμικού συστήματος. 
  Επιστρέφει πίνακα [n x 1] που περιέχει την λύση του γραμμικού
  συστήματος Α*x=B ή x=A^-1 * B. Ακολουθεί την μέθοδο Cramer. 
  Η συνάρτηση δέχεται σαν είσοδο έναν πίνακα [n x n+1 ] που
  περιέχει του συντελεστές των αγνώστων στην αριστερή περιοχή και
  τους σταθερούς συντελεστές στα δεξιά
  π.χ. για το σύστημα 
	
		3x1+x2=1
		2x1+4x2=-6
		
  ο πίνακας γράφεται
  
	['3', '1', '1', '2', '4', '-6'] με dim=3
	
  Η μέθοδος επιλύει μόνο γραμμικά συστήματα Ν x N 
*/
function johnkscienceMathMatrixCramer(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows+1 != cols) return 'NaN';
	
	//Υπολογίζει τον πίνακα των συντελεστών των αγνώστων
	let A=johnkscienceMathMatrixCopyExcludeCol(mtrx, dim-1, dim);
	
	//Υπολογίζει τον πίνακα των σταθερών όρων
	let B=[];
	for(let i=0; i<rows; i++){
		B.push(johnkscienceMathMatrixCell(mtrx, i, dim-1, dim)); 
	}
	
	let A1;
	if( (A1=johnkscienceMathMatrixInverse(A, dim-1)) != 'NaN' ){
		return johnkscienceMathMatrixMult(A1, dim-1, B, 1);
	}else{
		return 'NaN';
	}
	
	
}

/*Εύρεση χαρακτηριστικής εξίσωσης |A-λI| */
function johnkscienceMathMatrixCharacteristicEquetion(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows != cols) return 'NaN';

	//Μετατρέπει τον πίνακα mtrx σε πίνακα πολυωνύμων
	let A=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			if(i==j){
				A.push([''+johnkscienceMathMatrixCell(mtrx, i, j, dim), '-1']);
			}else{
				A.push([''+johnkscienceMathMatrixCell(mtrx, i, j, dim)]);
			}
		}
	}
	
	return johnkscienceMathPolyDeterminant(A, dim);


}

/*Εύρεση ιδιοτιμών όταν η χαρακτηριστική εξίσωση είναι 1ου, 2ου, 3ου βαθμού*/
function johnkscienceMathMatrixEigenValue(mtrx, dim){
	
	let poly=johnkscienceMathMatrixCharacteristicEquetion(mtrx, dim);
	if(poly=='NaN') return 'NaN';
	
	let degree=johnkscienceMathPolyDegree(poly);
	if(degree == 'NaN' ) return 'NaN';
	
	let res=[];
	if(degree==0){
		return 'NaN';
	}else if(degree==1){
		return johnkscienceMathPolySolve1(poly);
	}else if(degree==2){
		res=johnkscienceMathPolySolve2(poly);
		return [res[1], res[2]];
	}else if(degree==3){
		res=johnkscienceMathPolySolve3(poly);
		return [res[1], res[2], res[3]];
	}else{
		return 'NaN';
	}
}

/*Μετατρέπει τα στοιχεία του πίνακα σε Normal*/
function johnkscienceMathMatrixToNormal(mtrx, dim, decimals){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	//Μετατρέπει τον πίνακα mtrx σε πίνακα πολυωνύμων
	let res=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			res.push( johnkscienceMathComplexRecToNormal(
			johnkscienceMathMatrixCell(mtrx, i, j, dim), decimals));
		}
	}
	
	return res;
}

/*Μετατρέπει τα στοιχεία του πίνακα σε Scientific*/
function johnkscienceMathMatrixToScientific(mtrx, dim, approx){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	//Μετατρέπει τον πίνακα mtrx σε πίνακα πολυωνύμων
	let res=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			res.push( johnkscienceMathComplexRecToScientific(
			johnkscienceMathMatrixCell(mtrx, i, j, dim),approx));
		}
	}
	
	return res;
}

/*Μετατρέπει τα στοιχεία του πίνακα σε Fixed*/
function johnkscienceMathMatrixToFixed(mtrx, dim, approx){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);

	//Μετατρέπει τον πίνακα mtrx σε πίνακα πολυωνύμων
	let res=[];
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			res.push( johnkscienceMathComplexRecToFixed(
			johnkscienceMathMatrixCell(mtrx, i, j, dim),approx));
		}
	}
	
	return res;
}

/*Επιστρέφει το ΕΚΠ των στοιχείων του πίνακα*/
function johnkscienceMathMatrixLcm(mtrx, dim){
	
	function gcd(a,b) {
		a = Math.abs(a);
		b = Math.abs(b);
		if (b > a) {var temp = a; a = b; b = temp;}
		while (true) {
			if (b == 0) return a;
			a %= b;
			if (a == 0) return b;
			b %= a;
		}
	}

	function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }
	
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;
	
	//Αν δεν περιέχει αριθμούς
	if(mtrx.length==0) return 'NaN';
	
	//Αν περιέχει έναν αριθμό
	if(mtrx.length==1){
		return johnkscienceMathComplexRecToInt(
				johnkscienceMathMatrixCell(mtrx, 0, 0, dim)
		);
	}
	
	//Αν περιέχει τουλάχιστον 2 αριθμούς
	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	
	let res=johnkscienceMathComplexRecToInt(johnkscienceMathMatrixCell(mtrx, 0, 0, dim));
	res=Number(johnkscienceMathScientificToScientific(res));
	let n;
	
	
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			n=johnkscienceMathComplexRecToInt(johnkscienceMathMatrixCell(mtrx, i, j, dim));
			n=Number(johnkscienceMathScientificToScientific(n));
			res=lcm(res, n);			
		}
	}
	
	return ''+res;

}

/*Επιστρέφει το ΜΚΔ των στοιχείων του πίνακα*/
function johnkscienceMathMatrixGcd(mtrx, dim){
	
	function gcd(a,b) {
		a = Math.abs(a);
		b = Math.abs(b);
		if (b > a) {var temp = a; a = b; b = temp;}
		while (true) {
			if (b == 0) return a;
			a %= b;
			if (a == 0) return b;
			b %= a;
		}
	}

	function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }
	
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return false;
	
	//Αν δεν περιέχει αριθμούς
	if(mtrx.length==0) return 'NaN';
	
	//Αν περιέχει έναν αριθμό
	if(mtrx.length==1){
		return johnkscienceMathComplexRecToInt(
				johnkscienceMathMatrixCell(mtrx, 0, 0, dim)
		);
	}
	
	//Αν περιέχει τουλάχιστον 2 αριθμούς
	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	
	let res=johnkscienceMathComplexRecToInt(johnkscienceMathMatrixCell(mtrx, 0, 0, dim));
	res=Number(johnkscienceMathScientificToScientific(res));
	let n;
	
	
	for(let i=0; i<rows; i++){
		for(let j=0; j<cols; j++){
			n=johnkscienceMathComplexRecToInt(johnkscienceMathMatrixCell(mtrx, i, j, dim));
			n=Number(johnkscienceMathScientificToScientific(n));
			res=gcd(res, n);			
		}
	}
	
	return ''+res;

}

/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%         ΠΟΛΥΩΝΥΜΑ (POLY)             %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Οι παρακάτω συναρτήσεις χειρίζονται πολυώνυμα.
  ένα πολυώνυμο αναπαριστάται από έναν πίνακα γραμμή.
  Η αρίθμηση του πίνακα ξεκινά από το 0 και αυτός είναι 
  και ο ελάχιστος όρος του πολυωνύμου.
  
  π.χ. το πολυώνυμο 2χ^3+3χ^2-3 
  
  δίνεται από τον πίνακα
  
  ['-3', '0', '3', '2']
  
*/
	
/*Η παρακάτω συνάρτηση επιστρέφει τον βαθμό του πολυωνύμου*/
function johnkscienceMathPolyDegree(poly){
	let k=0;
	if(poly.length>=0){
		for(let i=poly.length-1; i>=0; i--){
			if(johnkscienceMathComplexRecIsZero(poly[i])){
				k++;
			}else{
				break;
			}
		}
		return poly.length-1-k;
	}else{
		return 'NaN';
	}
}

function johnkscienceMathPolyTerm(poly, degree){
	return poly[degree];
}

/*Προσθέτει μηδενικά στο τέλος του poly μέχρι μέγεθος degree*/
function johnkscienceMathPolyShiftLeft(poly, degree){
	let res=poly;
	if(johnkscienceMathPolyDegree(poly)>=degree){
		return poly;
	}else{
		for(let i=johnkscienceMathPolyDegree(poly); i<degree; i++){
			res.push('0');
		}
		return res;
	}
}

/*Προσθέτει μηδενικά στην αρχή του poly μέχρι μέγεθος degree*/
function johnkscienceMathPolyShiftRight(poly, degree){
	let res=[];
	if(johnkscienceMathPolyDegree(poly)>=degree){
		return poly;
	}else{
		for(let i=0; i<degree-johnkscienceMathPolyDegree(poly); i++){
			res.push('0');
		}
		for(let i=0; i<=johnkscienceMathPolyDegree(poly); i++){
			res.push(johnkscienceMathPolyTerm(poly, i));
		}
		return res;
	}
}

/*Προσθέτει μηδενικά στο τέλος του poly μέχρι μέγεθος degree*/
function johnkscienceMathPolyToDegree(poly, degree){
	let res=poly;
	if(johnkscienceMathPolyDegree(poly)>=degree){
		return res;
	}else{
		for(let i=johnkscienceMathPolyDegree(poly); i<degree; i++){
			res.push('0');
		}
		return res;
	}
}

/*Επιστρέφει true έναν το πολυώνυμο είναι το μηδενικό*/
function johnkscienceMathPolyIsZero(poly){
	
	let degree=johnkscienceMathPolyDegree(poly);
	if(degree=='NaN') return 'NaN';
	
	for(let i=0; i<=degree; i++){
		if(!johnkscienceMathComplexRecIsZero(johnkscienceMathPolyTerm(poly,i))){
			return false;
		}
	}
	return true;
}

/*Επιστρέφει true εάν ο z είναι ρίζα του πολυωνύμου	*/
function johnkscienceMathPolyIsRoot(poly, num){
	
	let degree=johnkscienceMathPolyDegree(poly);
	if(degree == 'NaN' ) return 'NaN';
	
	let res='0';
	for(let i=0; i<=degree; i++){
		res=johnkscienceMathComplexRecAdd(
				johnkscienceMathComplexRecMult(
					johnkscienceMathComplexRecPow2(''+num,''+i),
					poly[i]
				),
				res
			);
	}
	
	//res=johnkscienceMathComplexRecApproxToZero(res, _APPROX_TO_ZERO); 
	
	if( johnkscienceMathComplexRecIsZero(res) ){
		return true;
	}else{
		return false;
	}

}

/*Επιστρέφει true εάν το poly2 διαιρεί ακριβώς το poly1	*/
function johnkscienceMathPolyIsFactor(poly1, poly2){
		if(johnkscienceMathPolyIsZero(
		johnkscienceMathPolyDivRemainder(poly1, poly2))){
			return true;
		}else{
			return false;
		}
}

/*Η παρακάτω συνάρτηση προσθέτει δύο πολυώνυμα*/
function johnkscienceMathPolyAdd(poly1, poly2){
	
	let degree1=johnkscienceMathPolyDegree(poly1);
	let degree2=johnkscienceMathPolyDegree(poly2);
	
	if(degree1 == 'NaN' || degree2 == 'NaN') return 'NaN';
	
	//Μετασχηματίζει τους δύο πίνακες ώστε να έχουν ίδιο μήκος
	let lhs, rhs, degree;
	if(degree1>degree2){
		lhs=poly1;
		rhs=johnkscienceMathPolyToDegree(poly2, degree1);
		degree=degree1;
	}else if(degree1<degree2){
		lhs=johnkscienceMathPolyToDegree(poly1, degree2);
		rhs=poly2;
		degree=degree2;
	}else{
		lhs=poly1;
		rhs=poly2;
		degree=degree1;
	}
	
	let res=[];
	for(let i=0; i<=degree; i++){
		res.push(johnkscienceMathComplexRecAdd(''+lhs[i], ''+rhs[i]));
	}
	return res;
}

/*Η παρακάτω συνάρτηση αφαιρεί δύο πολυώνυμα*/
function johnkscienceMathPolySub(poly1, poly2){
	
	let degree1=johnkscienceMathPolyDegree(poly1);
	let degree2=johnkscienceMathPolyDegree(poly2);
	
	if(degree1 == 'NaN' || degree2 == 'NaN') return 'NaN';
	
	//Μετασχηματίζει τους δύο πίνακες ώστε να έχουν ίδιο μήκος
	let lhs, rhs, degree;
	if(degree1>degree2){
		lhs=poly1;
		rhs=johnkscienceMathPolyToDegree(poly2, degree1);
		degree=degree1;
	}else if(degree1<degree2){
		lhs=johnkscienceMathPolyToDegree(poly1, degree2);
		rhs=poly2;
		degree=degree2;
	}else{
		lhs=poly1;
		rhs=poly2;
		degree=degree1;
	}
	
	let res=[];
	for(let i=0; i<=degree; i++){
		res.push(johnkscienceMathComplexRecSub(''+lhs[i], ''+rhs[i]));
	}
	return res;
}

/*Η παρακάτω συνάρτηση πολλαπλασιάζει δύο πολυώνυμα*/
function johnkscienceMathPolyMult(poly1, poly2){
	
	let degree1=johnkscienceMathPolyDegree(poly1);
	let degree2=johnkscienceMathPolyDegree(poly2);
	
	if(degree1 == 'NaN' || degree2 == 'NaN') return 'NaN';
	
	let res=[];
	for(let k=0; k<=degree1+degree2; k++){
		c='0'
		for(let i=0; i<=degree1; i++){
			for(let j=0; j<=degree2; j++){
				if(k==i+j){
					c=johnkscienceMathComplexRecAdd(
						c,
						johnkscienceMathComplexRecMult(
							''+poly1[i],
							''+poly2[j]
						)
					);
				}
			}
		}
		res.push(c);
	}
		
	return res;
}

/*Πολλαπλασιάζει έναν αριθμό με το πολυώνυμο*/
function johnkscienceMathPolyScalarMult(num, poly){
	let degree=johnkscienceMathPolyDegree(poly);

	if(degree == 'NaN') return 'NaN';
	
	let res=[];
	
	for(let k=0; k<=degree; k++){
		res.push(johnkscienceMathComplexRecMult(
					''+num,
					johnkscienceMathPolyTerm(poly, k)
				));
	}
	return res;
}

/*Διαιρεί δύο πολυώνυμα και επιστρέφει το πηλίκο*/
function johnkscienceMathPolyDivQuotient(poly1, poly2){
	let degree1=johnkscienceMathPolyDegree(poly1);
	let degree2=johnkscienceMathPolyDegree(poly2);
	
	if(degree1 == 'NaN' || degree2 == 'NaN') return 'NaN';
	if(degree2>degree1) return 'NaN';
	if(johnkscienceMathPolyIsZero(poly2)) return 'NaN';
	
	let d=poly2;
	let q=['0'];
	let r=poly1;
	let t1, d1;
	let t=[];
	
	while( !johnkscienceMathPolyIsZero(r) && johnkscienceMathPolyDegree(r) >= johnkscienceMathPolyDegree(d)){
		t1=0;
		t=[];
		t1=johnkscienceMathComplexRecDiv(
				johnkscienceMathPolyTerm(r,johnkscienceMathPolyDegree(r)),
				johnkscienceMathPolyTerm(d,johnkscienceMathPolyDegree(d))
		);
		//console.log("t1=",t1);
		d1=johnkscienceMathPolyDegree(r) - johnkscienceMathPolyDegree(d);
		//console.log("d1=",d1);
		t.push(t1);
		//console.log("t=",t);
		t=johnkscienceMathPolyShiftRight(t, d1);
		//console.log("t=",t);
		q=johnkscienceMathPolyAdd(q, t);
		//console.log("q=",q);
		r=johnkscienceMathPolySub(
			r,
			johnkscienceMathPolyScalarMult(
				t1, 
				johnkscienceMathPolyShiftRight(d, johnkscienceMathPolyDegree(r))
			)
		);
		//console.log("r=",r);
		//console.log("dr=",johnkscienceMathPolyDegree(r));
	}
	
	return q;
	
}

/*Διαιρεί δύο πολυώνυμα και επιστρέφει το υπόλοιπο*/
function johnkscienceMathPolyDivRemainder(poly1, poly2){
	let degree1=johnkscienceMathPolyDegree(poly1);
	let degree2=johnkscienceMathPolyDegree(poly2);
	
	if(degree1 == 'NaN' || degree2 == 'NaN') return 'NaN';
	if(degree2>degree1) return 'NaN';
	if(johnkscienceMathPolyIsZero(poly2)) return 'NaN';
	
	let d=poly2;
	let q=['0'];
	let r=poly1;
	let t1, d1;
	let t=[];
	
	while( !johnkscienceMathPolyIsZero(r) && johnkscienceMathPolyDegree(r) >= johnkscienceMathPolyDegree(d)){
		t1=0;
		t=[];
		t1=johnkscienceMathComplexRecDiv(
				johnkscienceMathPolyTerm(r,johnkscienceMathPolyDegree(r)),
				johnkscienceMathPolyTerm(d,johnkscienceMathPolyDegree(d))
		);
		//console.log("t1=",t1);
		d1=johnkscienceMathPolyDegree(r) - johnkscienceMathPolyDegree(d);
		//console.log("d1=",d1);
		t.push(t1);
		//console.log("t=",t);
		t=johnkscienceMathPolyShiftRight(t, d1);
		//console.log("t=",t);
		q=johnkscienceMathPolyAdd(q, t);
		//console.log("q=",q);
		r=johnkscienceMathPolySub(
			r,
			johnkscienceMathPolyScalarMult(
				t1, 
				johnkscienceMathPolyShiftRight(d, johnkscienceMathPolyDegree(r))
			)
		);
		//console.log("r=",r);
		//console.log("dr=",johnkscienceMathPolyDegree(r));
	}
	
	return r;
	
}

/*Επιστρέφει την τιμή του πολυωνύμου	*/
function johnkscienceMathPolyValue(poly, num){
	
	let degree=johnkscienceMathPolyDegree(poly);
	if(degree == 'NaN' ) return 'NaN';
	
	let res='0';
	for(let i=0; i<=degree; i++){
		res=johnkscienceMathComplexRecAdd(
				johnkscienceMathComplexRecMult(
					johnkscienceMathComplexRecPow2(''+num,''+i),
					poly[i]
				),
				res
			);
	}
	return res;

}

/*Θεώρημα ακέραιων ριζών. Υπό Κατασκευή
  Εφαρμόζει το θεώρημα των ακέραιων ριζών και επιστρέφει
  πίνακα γραμμή με τις ακέραιες ρίζες του πολυωνύμου που
  είναι διαιρέτες του σταθερού όρου.*/
function johnkscienceMathPolyTryIntegerRoots(poly){
	return [];
}

/*Επιστρέφει την ορίζουσα του τετρ. πίνακα mtrx
  όπου τα στοιχεία του είναι πολυώνυμα μιγαδικών. Επιστρέφει ένα 
  μιγαδικό πολυώνυμο
  
  π.χ. αν 
  
  let A=[ ['1','2'],['-1','4'],['1','1'],
	  ['2','1'],['-1','3'],['1','1'],
	  ['2','-1'],['-1','3'],['1','1']
	  ];
  let dim=3;
  
  τότε 
  
  console.log(johnkscienceMathPolyDeterminant(A, dim));
  
  επιστρέφει 
  
  [ "0_1e0&0_1e0", "0_1e0&0_1e0", "-2_1e0&0_1e0", "-2_1e0&0_1e0" ]
  
  ή 
  
  -2χ^3-2χ^2+0+0
  
  */
function johnkscienceMathPolyDeterminant(mtrx, dim){
	//Οι πίνακες πρέπει να είναι δισδιάστατοι
	if(!johnkscienceMathMatrixIsTwoDimentional(mtrx, dim)) return 'NaN';

	let rows=johnkscienceMathMatrixRows(mtrx, dim);
	let cols=johnkscienceMathMatrixCols(mtrx, dim);
	if(rows!=cols) return 'NaN'; 
	if(rows==0) return 'NaN';
	
	let res;
	
	if(mtrx.length==1) return johnkscienceMathMatrixCell(mtrx, 0, 0, dim);
	
	
	if(mtrx.length==4){
		return johnkscienceMathPolySub(
					johnkscienceMathPolyMult(
						johnkscienceMathMatrixCell(mtrx, 0, 0, dim),
						johnkscienceMathMatrixCell(mtrx, 1, 1, dim)
					),
					johnkscienceMathPolyMult(
						johnkscienceMathMatrixCell(mtrx, 0, 1, dim),
						johnkscienceMathMatrixCell(mtrx, 1, 0, dim)
					)
				);
	}else{
		res=['0'];
		for(let i=0; i<rows; i++){
			res=johnkscienceMathPolyAdd(
				res,
				johnkscienceMathPolyScalarMult(
					johnkscienceMathComplexRecPow2('-1', ''+i),
					johnkscienceMathPolyMult(
						johnkscienceMathMatrixCell(mtrx, i, 0, dim),
						johnkscienceMathPolyDeterminant(
							johnkscienceMathMatrixCopyExcludeRowCol(mtrx,i,0,dim),
							dim-1
						)
					)
				)
			);
		}
	}
	return res;

}

/*Λύνει την εξίσωση πρώτου βαθμού. Επιστρέφει έναν πίνακα με την λύση
  αλλιώς NaN.*/
function johnkscienceMathPolySolve1(poly){
	
	let degree=johnkscienceMathPolyDegree(poly);
	if(degree != 1) return 'NaN';
	
	//ax+b ή ['b', 'a']
	let a= johnkscienceMathPolyTerm(poly, 1);
	let b= johnkscienceMathPolyTerm(poly, 0);
	
	if( !johnkscienceMathComplexRecIsZero(''+a) ){
		return [johnkscienceMathComplexRecDiv(
					johnkscienceMathComplexRecOpposite(''+b),
					''+a
				)];
	}else{
		if(johnkscienceMathComplexRecIsZero(''+b) ){
			return 'NaN';//Ταυτότητα
		}else{
			return 'NaN';//Αδύνατη
		}
	}
}

/*Υπολογίζει τις ρίζες της δευτεροβάθμιας εξίσωσης (P)->[]*/
function johnkscienceMathPolySolve2(poly){
	
	let degree=johnkscienceMathPolyDegree(poly);
	if(degree != 2) return 'NaN';
	
	//ax^2+bx+c ή ['c', 'b', 'a']
	let a= johnkscienceMathPolyTerm(poly, 2);
	let b= johnkscienceMathPolyTerm(poly, 1);
	let c= johnkscienceMathPolyTerm(poly, 0);
	
	if(johnkscienceMathComplexRecIsZero(''+a)) return 'NaN';
	
	let D=johnkscienceMathComplexRecSub(
				johnkscienceMathComplexRecMult(b, b),
					johnkscienceMathComplexRecMult(
						"4",
						johnkscienceMathComplexRecMult(a,c)
						)
					);
	let x1=johnkscienceMathComplexRecDiv(
			johnkscienceMathComplexRecAdd(
				johnkscienceMathComplexRecSub("0", b),
				johnkscienceMathComplexRecRoot(D,2,0)),
			johnkscienceMathComplexRecMult("2", a));	
			
	let x2=johnkscienceMathComplexRecDiv(
			johnkscienceMathComplexRecSub(
				johnkscienceMathComplexRecSub("0", b),
				johnkscienceMathComplexRecRoot(D,2,0)),
			johnkscienceMathComplexRecMult("2", a));
			
	return [D, x1, x2];
}

/*Υπολογίζει τις ρίζες της τριτοβάθμιας εξίσωσης (P)->[]*/
function johnkscienceMathPolySolve3(poly){
	
	let degree=johnkscienceMathPolyDegree(poly);
	if(degree != 3) return 'NaN';
	
	//a0*x^3+a1*x^2+a2*x+a3 ή ['a3', 'a2', 'a1', 'a0']
	let a0= johnkscienceMathPolyTerm(poly, 3);
	let a1= johnkscienceMathPolyTerm(poly, 2);
	let a2= johnkscienceMathPolyTerm(poly, 1);
	let a3= johnkscienceMathPolyTerm(poly, 0);
	
	a1=johnkscienceMathComplexRecDiv(''+a1, ''+a0);
	a2=johnkscienceMathComplexRecDiv(''+a2, ''+a0);
	a3=johnkscienceMathComplexRecDiv(''+a3, ''+a0);
	
	let Q=johnkscienceMathComplexRecDiv(
			johnkscienceMathComplexRecSub(
				johnkscienceMathComplexRecMult('3', ''+a2),
				johnkscienceMathComplexRecMult(''+a1, ''+a1)
			),
			'9'
	);
	
	let R=johnkscienceMathComplexRecDiv(
			johnkscienceMathComplexRecSub(
				johnkscienceMathComplexRecSub(
					johnkscienceMathComplexRecMult(
					'9',
					johnkscienceMathComplexRecMult(''+a1, ''+a2)
					),
					johnkscienceMathComplexRecMult('27', ''+a3)
				),
				johnkscienceMathComplexRecMult(
					'2',
					johnkscienceMathComplexRecPow2(''+a1,'3')
					//παραπάνω αν αντικαταστήσεις την Pow με Pow2
					//προκύπτει λάθος.
				)
			),
			'54'
	);
	
	
	let S=johnkscienceMathComplexRecRoot(
			johnkscienceMathComplexRecAdd(
				''+R,
				johnkscienceMathComplexRecRoot(
					johnkscienceMathComplexRecAdd(
						johnkscienceMathComplexRecPow2(''+Q,'3'),
						johnkscienceMathComplexRecPow2(''+R,'2')
					),
					2,0
				)
			),
			3,0
	);
	
	let T=johnkscienceMathComplexRecRoot(
			johnkscienceMathComplexRecSub(
				''+R,
				johnkscienceMathComplexRecRoot(
					johnkscienceMathComplexRecAdd(
						johnkscienceMathComplexRecPow2(''+Q,'3'),
						johnkscienceMathComplexRecPow2(''+R,'2')
					),
					2,0
				)
			),
			3,0
	);			

	let x1=johnkscienceMathComplexRecSub(
				johnkscienceMathComplexRecAdd(S,T),
				johnkscienceMathComplexRecDiv(a1, '3')
	);


	let x2=johnkscienceMathComplexRecAdd(
				johnkscienceMathComplexRecAdd(
					johnkscienceMathComplexRecDiv(
						johnkscienceMathComplexRecAdd(S,T),
						'-2'
					),
					johnkscienceMathComplexRecDiv(a1, '-3')
				),
				johnkscienceMathComplexRecMult(
					'&-8660254038_10000000000',
					johnkscienceMathComplexRecSub(S, T)
				)
	);
	
	let x3=johnkscienceMathComplexRecAdd(
				johnkscienceMathComplexRecAdd(
					johnkscienceMathComplexRecDiv(
						johnkscienceMathComplexRecAdd(S,T),
						'-2'
					),
					johnkscienceMathComplexRecDiv(a1, '-3')
				),
				johnkscienceMathComplexRecMult(
					'&8660254038_10000000000',
					johnkscienceMathComplexRecSub(S, T)
				)
	);
						
	return [Q, x1, x2, x3];	

	
}

function johnkscienceMathPolyApproxToZero(poly, epsilon){
	let degree=johnkscienceMathPolyDegree(poly);
	
	if(degree == 'NaN') return 'NaN';
	
	let res=[];
	for(let i=0; i<=degree; i++){
		res.push(johnkscienceMathComplexRecApproxToZero(
			johnkscienceMathPolyTerm(poly, i),
			epsilon
		));
	}
	return res;
	
}

/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%         ΣΤΑΤΙΣΤΙΚΗ (STATISTICS)      %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Οι παρακάτω συναρτήσεις κάνουν στατιστική.
  Σχετίζονται με πίνακες γραμμές
  
*/

/*Αριθμός στοιχείων*/
function johnkscienceMathStatisticsN(mtrx){
	return mtrx.length;
}

/*Επιστρέφει το στοιχείο i. Η αρίθμηση αρχίζει από 0 */
function johnkscienceMathStatisticsCell(mtrx, i){
	return mtrx[i];
}

/*Άθροισμα Στοιχείων*/
function johnkscienceMathStatisticsSum(mtrx){
	let len=mtrx.length;
	let res='0';
	for(let i=0; i<len; i++){
		res=johnkscienceMathComplexRecAdd(
			res,
			johnkscienceMathStatisticsCell(mtrx,i)
		);
	}
	return res;
}

/*Αθροίσματα Δυνάμεων Sum(x^n), n>0*/
function johnkscienceMathStatisticsSumOfPowers(mtrx,n){
	let len=mtrx.length;
	let res='0';
	for(let i=0; i<len; i++){
		res=johnkscienceMathComplexRecAdd(
			res,
			johnkscienceMathComplexRecPow2(
				''+johnkscienceMathStatisticsCell(mtrx,i),
				''+n
			)
		);
	}
	return res;
}

/*Μέση Τιμή*/
function johnkscienceMathStatisticsMean(mtrx){
	if(johnkscienceMathStatisticsN(mtrx)==0) return 'NaN';
	return johnkscienceMathComplexRecDiv( 
				''+johnkscienceMathStatisticsSum(mtrx),
				''+johnkscienceMathStatisticsN(mtrx)
			);
}

/*Διασπορά, διακύμανση ή μεταβλητότητα σ^2*/
function johnkscienceMathStatisticsVariance(mtrx){
	let N=johnkscienceMathStatisticsN(mtrx);
	if(N==0){ return 'NaN&NaN';}
	let m=johnkscienceMathStatisticsMean(mtrx);
	let res='0';
	
	for(let i=0; i<N; i++){
		res=johnkscienceMathComplexRecAdd(
			res,
			johnkscienceMathComplexRecPow2(
				johnkscienceMathComplexRecSub(
					''+johnkscienceMathStatisticsCell(mtrx,i),
					''+m
				),
				''+2
			)
		);
	}
	return johnkscienceMathComplexRecDiv(''+res, ''+N);
}

/*Τυπική απόκλιση σ*/
function johnkscienceMathStatisticsStandardDeviation(mtrx){
	
	if(johnkscienceMathStatisticsN(mtrx)==0) return 'NaN&NaN';
	return johnkscienceMathComplexRecRoot(
		johnkscienceMathStatisticsVariance(mtrx),
		2,0
	);
	
}

/*Κεντρικές Ροπές περί την μέση τιμή μ_n=E[(x-μ)^n], n>1*/
function johnkscienceMathStatisticsMoment(mtrx, n){
	let N=johnkscienceMathStatisticsN(mtrx);
	if(N==0){ return 'NaN&NaN';}
	let m=johnkscienceMathStatisticsMean(mtrx);
	let res='0';
	
	for(let i=0; i<N; i++){
		res=johnkscienceMathComplexRecAdd(
			res,
			johnkscienceMathComplexRecPow2(
				johnkscienceMathComplexRecSub(
					''+johnkscienceMathStatisticsCell(mtrx,i),
					''+m
				),
				''+n
			)
		);
	}
	return johnkscienceMathComplexRecDiv(''+res, ''+N);
}

/*Λοξότητα m_3/σ^3 */
function johnkscienceMathStatisticsSkewness(mtrx){
	let N=johnkscienceMathStatisticsN(mtrx);
	if(N==0){ return 'NaN&NaN';}
	return johnkscienceMathComplexRecDiv(
				johnkscienceMathStatisticsMoment(mtrx,3),
				johnkscienceMathComplexRecPow2(
					johnkscienceMathStatisticsStandardDeviation(mtrx),
					''+3
				)
			);
			
}

/*Κύρτωση m_4/σ^4 */
function johnkscienceMathStatisticsKurtosis(mtrx){
	let N=johnkscienceMathStatisticsN(mtrx);
	if(N==0){ return 'NaN&NaN';}
	return johnkscienceMathComplexRecDiv(
				johnkscienceMathStatisticsMoment(mtrx,4),
				johnkscienceMathComplexRecPow2(
					johnkscienceMathStatisticsStandardDeviation(mtrx),
					''+4
				)
			);
			
}

/*Σφάλμα μέσης τιμής */
function johnkscienceMathStatisticsDx(mtrx){
	
	let N=johnkscienceMathStatisticsN(mtrx);
	if(N==0){ return 'NaN&NaN';}
	let m=johnkscienceMathStatisticsMean(mtrx);
	let res='0';
	for(let i=0; i<N; i++){
		res=johnkscienceMathComplexRecAdd(
			res,
			johnkscienceMathComplexRecPow2(
				johnkscienceMathComplexRecSub(
					''+johnkscienceMathStatisticsCell(mtrx,i),
					''+m
				),
				''+2
			)
		);
	}
	
	res=johnkscienceMathComplexRecRoot(
			johnkscienceMathComplexRecDiv(
				res,
				johnkscienceMathComplexRecMult(
					''+N,
					johnkscienceMathComplexRecSub(
						''+N,
						'1'
					)
				)
			),2,0
	);
	return res;
	
}

/*Μέθοδος ελαχίστων τετραγώνων. Ευθεία. Επιστρέφει [Α, ΔΑ, Β, ΔΒ]*/
function johnkscienceMathStatisticsRegretionLine(mtrx){
	let N=johnkscienceMathStatisticsN(mtrx);
	if(N==0){ return ['NaN', 'NaN', 'NaN', 'NaN'];}
	if(N>5 && N % 2 ==0){
		//Υπολογίζει τα Σx, Σy, Σxy, Σx^2
		let sx=''+mtrx[0];
		let sy=''+mtrx[1];
		let sx2=johnkscienceMathComplexRecMult(''+mtrx[0], ''+mtrx[0]);
		let sxy=johnkscienceMathComplexRecMult(''+mtrx[0], ''+mtrx[1]);	
		for(let i=2; i<N; i+=2){
			sx=johnkscienceMathComplexRecAdd(''+sx, ''+mtrx[i]);
			sy=johnkscienceMathComplexRecAdd(''+sy, ''+mtrx[i+1]);
			sx2=johnkscienceMathComplexRecAdd(
				''+sx2,
				johnkscienceMathComplexRecMult(
					''+mtrx[i],
					''+mtrx[i]
				));
			sxy=johnkscienceMathComplexRecAdd(
				''+sxy,
				johnkscienceMathComplexRecMult(
					''+mtrx[i],
					''+mtrx[i+1]
			));
		}
		
			
			//Υπολογίζει τα Δ, Α, Β
			let D = johnkscienceMathComplexRecSub(
					johnkscienceMathComplexRecMult(
						johnkscienceMathComplexRecDiv(''+N, '2'),
						''+sx2
					),
					johnkscienceMathComplexRecMult(''+sx, ''+sx)
			);
			
			
			let A=johnkscienceMathComplexRecDiv(
					johnkscienceMathComplexRecSub(
						johnkscienceMathComplexRecMult(''+sx2, ''+sy),
						johnkscienceMathComplexRecMult(''+sx, ''+sxy)
					),
					''+D
			);
			
			let B=johnkscienceMathComplexRecDiv(
					johnkscienceMathComplexRecSub(
						johnkscienceMathComplexRecMult(
							johnkscienceMathComplexRecDiv(''+N, '2'),
							''+sxy
						),
						johnkscienceMathComplexRecMult(
							''+sx,
							''+sy
						)
					),
					''+D
			);
			
			
					
			//Υπολογίζει το σψ
			let yABx2 = johnkscienceMathComplexRecPow2(
						 johnkscienceMathComplexRecSub(
							''+mtrx[1],
							johnkscienceMathComplexRecAdd(
								''+A,
								johnkscienceMathComplexRecMult(
									''+B,
									''+mtrx[0]
								)
							)
						 ),'2'
			);		
			
			for(let i=2; i<N; i+=2){
				yABx2 = johnkscienceMathComplexRecAdd(
							''+yABx2,
							johnkscienceMathComplexRecPow2(
								johnkscienceMathComplexRecSub(
									''+mtrx[i+1],
									johnkscienceMathComplexRecAdd(
										''+A,
										johnkscienceMathComplexRecMult(
											''+B,
											mtrx[i]
										)
									)
								),'2'
							)
				);
							
			}
			let ssy = johnkscienceMathComplexRecRoot(
						johnkscienceMathComplexRecDiv(
							''+yABx2,
							johnkscienceMathComplexRecSub(
								johnkscienceMathComplexRecDiv(''+N, '2'),
								'2'
							)
						),2,0
			);
			
			
			
			//Υπολογίζει τα δΑ, δΒ
			let DA = johnkscienceMathComplexRecMult(
						''+ssy,
						johnkscienceMathComplexRecRoot(
							johnkscienceMathComplexRecDiv(''+sx2, ''+D),
							2,0
						)
			);
			
			
			let DB = johnkscienceMathComplexRecMult(
						''+ssy,
						johnkscienceMathComplexRecRoot(
							johnkscienceMathComplexRecDiv(
								johnkscienceMathComplexRecDiv(''+N, '2'),
								''+D
							),2,0
						)
			);
			
			
			return [A, DA, B, DB];
		}else{
			return ['NaN', 'NaN', 'NaN', 'NaN'];
		}
}

/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%         ΣΤΑΘΕΡΕΣ 			        %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Σταθερές με μέχρι 16 δεκαδικά ψηφία*/

var johnkscienceMathConstantPI = '31415926535897932_10000000000000000';
var johnkscienceMathConstantE = '2718281828459045_1000000000000000';

/*  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%      
	%%         ΔΙΕΡΜΗΝΕΥΤΗΣ  		        %%
	%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
*/

/*Μητρώο μηνυμάτων, λαθών και προειδοποιήσεων*/
var johnkscienceInterpreterErrorHistory = [
	['johnkscience:0', 'Κανένα λάθος', 0]
];

/*Προσθέτει στην κορυφή της στοίβας ένα νέο μήνυμα*/
function johnkscienceInterpreterErrorPush(type, msg, line){
	johnkscienceInterpreterErrorHistory.push( [ type, msg, line ]);
}

/*Αφαιρεί και επιστρέφει από την κορυφή της στοίβας το τελευταίο μήνυμα,
  αλλίως (αν η στοίβα είναι κενή) επιστρέφει null
*/
function johnkscienceInterpreterErrorPop(){
	if(johnkscienceInterpreterErrorHistory.length>0){
		return johnkscienceInterpreterErrorHistory.pop();
	}else{
		return null;
	}
}

/*Επιστρέφει (αλλά δεν αφαιρεί) το τελευταίο μήνυμα από την στοίβα*/
function johnkscienceInterpreterErrorLast(){
	return johnkscienceInterpreterErrorHistory[johnkscienceInterpreterErrorHistory.length-1];
}

/*Επιστρέφει (αλλά δεν αφαιρεί) το πρώτο μήνυμα από την στοίβα*/
function johnkscienceInterpreterErrorFirst(){
	if(johnkscienceInterpreterErrorHistory.length>1){
		return johnkscienceInterpreterErrorHistory[1];
	}else{
		return johnkscienceInterpreterErrorHistory[0];
	}
}

/*Επιστρέφει (αλλά δεν αφαιρεί) όλη την στοίβα*/
function johnkscienceInterpreterErrorAll(){
	return johnkscienceInterpreterErrorHistory;
}

/*Διαγράφει όλη την στοίβα*/
function johnkscienceInterpreterErrorDelete(){
	johnkscienceInterpreterErrorHistory = [
		['johnkscience:0', 'Κανένα λάθος', 0]
	];
}

/*Μητρώο συμβόλων, τελεστών, σταθερών και λέξεων*/
var johnkscienceInterpreterTableOfSymbols = [
	//Αναγνωριστικό αρχής προγράμματος
	{type:'SYMBOL', name:'programBegin', precedence:20, associativity:undefined, str:undefined},
	
	//Αριστερή και δεξιά παρένθεση, Ομαδοποίηση εκφράσεων
	{type:'SYMBOL', name:'leftParenthesis', precedence:0, associativity:undefined, str:'('}, 
	{type:'SYMBOL', name:'rightParenthesis',  precedence:0, associativity:undefined, str:')'},
	
	//Αριστερή και δεξιά αγκύλη '[', ']'.
	{type:'SYMBOL', name:'leftBracket', precedence:undefined, associativity:undefined, str:'['},
	{type:'SYMBOL', name:'rightBracket', precedence:undefined, associativity:undefined, str:']'},
	
	//Αριστερό και δεξιό άγκιστρο '{', '}'
	{type:'SYMBOL', name:'leftHooks', precedence:undefined, associativity:undefined, str:'{'}, 
	{type:'SYMBOL', name:'rightHooks', precedence:undefined, associativity:undefined, str:'}'}, 
	
	//Πρόσβαση σε ιδιότητα αντικειμένου '.'
	{type:'OPERATOR', name:'dot', precedence:17, associativity:'left-to-right', str:'.'},
	//Πρόσβαση σε ιδιότητα αντικειμένου '?.'
	{type:'OPERATOR', name:'optionalChaining', precedence:17, associativity:'left-to-right', str:'?.'},
	
	//Κλίση συνάρτησης. Όλες οι συναρτήσεις τοποθετούνται με 
	//προτεραιότητα 16.500 έως 16.999
	{type:'FUNCTION', name:'0028', precedence:16.5, associativity:'right-to-left', str:'sin'},
	{type:'FUNCTION', name:'0029', precedence:16.5, associativity:'right-to-left', str:'cos'},
	{type:'FUNCTION', name:'0030', precedence:16.5, associativity:'right-to-left', str:'tan'},
	{type:'FUNCTION', name:'0022', precedence:16.5, associativity:'right-to-left', str:'asin'},
	{type:'FUNCTION', name:'0023', precedence:16.5, associativity:'right-to-left', str:'acos'},
	{type:'FUNCTION', name:'0024', precedence:16.5, associativity:'right-to-left', str:'atan'},
	{type:'FUNCTION', name:'0025', precedence:16.5, associativity:'right-to-left', str:'sinh'},
	{type:'FUNCTION', name:'0026', precedence:16.5, associativity:'right-to-left', str:'cosh'},
	{type:'FUNCTION', name:'0027', precedence:16.5, associativity:'right-to-left', str:'tanh'},
	{type:'FUNCTION', name:'0015', precedence:16.5, associativity:'right-to-left', str:'asinh'},
	{type:'FUNCTION', name:'0016', precedence:16.5, associativity:'right-to-left', str:'acosh'},
	{type:'FUNCTION', name:'0017', precedence:16.5, associativity:'right-to-left', str:'atanh'},
	{type:'FUNCTION', name:'0019', precedence:16.5, associativity:'right-to-left', str:'sqrt'},
	{type:'FUNCTION', name:'0018', precedence:16.5, associativity:'right-to-left', str:'root'},
	{type:'FUNCTION', name:'0020', precedence:16.5, associativity:'right-to-left', str:'conj'},
	{type:'FUNCTION', name:'0032', precedence:16.5, associativity:'right-to-left', str:'arg'},
	{type:'FUNCTION', name:'0013', precedence:16.5, associativity:'right-to-left', str:'inner'},
	{type:'FUNCTION', name:'0012', precedence:16.5, associativity:'right-to-left', str:'cross'},
	{type:'FUNCTION', name:'0033', precedence:16.5, associativity:'right-to-left', str:'exp'},
	{type:'FUNCTION', name:'0036', precedence:16.5, associativity:'right-to-left', str:'ln'},
	{type:'FUNCTION', name:'0034', precedence:16.5, associativity:'right-to-left', str:'log'},
	{type:'FUNCTION', name:'0021', precedence:16.5, associativity:'right-to-left', str:'loga'},
	{type:'FUNCTION', name:'0014', precedence:16.5, associativity:'right-to-left', str:'gamma'},
	{type:'FUNCTION', name:'0011', precedence:16.5, associativity:'right-to-left', str:'factorial'},
	{type:'FUNCTION', name:'0007', precedence:16.5, associativity:'right-to-left', str:'radToDegree'},
	{type:'FUNCTION', name:'0008', precedence:16.5, associativity:'right-to-left', str:'degreeToRad'},
	{type:'FUNCTION', name:'0010', precedence:16.5, associativity:'right-to-left', str:'gradToRad'},
	{type:'FUNCTION', name:'0009', precedence:16.5, associativity:'right-to-left', str:'radToGrad'},
	{type:'FUNCTION', name:'0037', precedence:16.5, associativity:'right-to-left', str:'floor'},
	{type:'FUNCTION', name:'0038', precedence:16.5, associativity:'right-to-left', str:'cail'},
	{type:'FUNCTION', name:'0039', precedence:16.5, associativity:'right-to-left', str:'round'},
	{type:'FUNCTION', name:'0041', precedence:16.5, associativity:'right-to-left', str:'rand'},
	{type:'FUNCTION', name:'0040', precedence:16.5, associativity:'right-to-left', str:'polar'},
	{type:'FUNCTION', name:'0035', precedence:16.5, associativity:'right-to-left', str:'abs'},
	{type:'FUNCTION', name:'000031', precedence:16.5, associativity:'right-to-left', str:'pow'},
		
	
	//Δημιουργία αντικειμένου 'new'
	{type:'OPERATOR', name:'new', precedence:16, associativity:undefined, str:'new'},
	
	//Μεταθεματικός τελεστής αύξησης τιμή  '++', π.χ. i++
	{type:'OPERATOR', name:'postfixIncrement', precedence:15, associativity:'left-to-right', str:'++'},
	//Μεταθεματικός τελεστής ελάττωσης τιμής  '--', π.χ. i--
	{type:'OPERATOR', name:'postfixDecrement', precedence:15, associativity:'left-to-right', str:'--'},
	
	//Προθεματικός τελεστής αύξησης τιμή  '++', π.χ. ++i
	{type:'OPERATOR', name:'prefixIncrement', precedence:14, associativity:'right-to-left', str:'++'},
	//Προθεματικός τελεστής ελάττωσης τιμής  '--', π.χ. --i
	{type:'OPERATOR', name:'prefixDecrement', precedence:14, associativity:'right-to-left', str:'--'},
	
	//Προθεματικός τελεστής θετικό πρόσημο  '+', π.χ. (+3)
	{type:'OPERATOR', name:'unaryPlus', precedence:14, associativity:'right-to-left', str:'+'},
	//Προθεματικός τελεστής αρνητικό πρόσημο  '-', π.χ. (-3)
	{type:'OPERATOR', name:'unaryNegation', precedence:14, associativity:'right-to-left', str:'-'},
	
	//Προθεματικός τελεστής Bitwise NOT  '~',
	{type:'OPERATOR', name:'bitwiseNOT', precedence:14, associativity:'right-to-left', str:'~'},
	
	//Επιθεματικός τελεστής παραγοντικό  '!'
	{type:'OPERATOR', name:'factorial', precedence:14, associativity:'right-to-left', str:'!'},
	//Προθεματικός τελεστής λογικό όχι  'not'
	{type:'OPERATOR', name:'logicalNotWord', precedence:14, associativity:'right-to-left', str:'not'},
	
	//Ενδοθεματικός τελεστής δύναμη αριθμών  '**'
	{type:'OPERATOR', name:'exponentiation', precedence:13, associativity:'right-to-left', str:'**'},
	//Ενδοθεματικός τελεστής βαθμωτή δύναμη πινάκων'.**'
	{type:'OPERATOR', name:'dotExponentiation', precedence:13, associativity:'right-to-left', str:'.**'},
	
	//Ενδοθεματικός τελεστής πολλαπλασιασμός αριθμών  '*'
	{type:'OPERATOR', name:'multiplication', precedence:12, associativity:'left-to-right', str:'*'},
	//Ενδοθεματικός τελεστής διαίρεση αριθμών  '/'
	{type:'OPERATOR', name:'division', precedence:12, associativity:'left-to-right', str:'/'},
	//Ενδοθεματικός τελεστής κλάσματος  '_'
	{type:'OPERATOR', name:'fraction', precedence:12, associativity:'left-to-right', str:'_'},
	//Ενδοθεματικός τελεστής βαθμωτός πολλαπλασιασμός πινάκων  '.*'
	{type:'OPERATOR', name:'dotMultiplication', precedence:12, associativity:'left-to-right', str:'.*'},
	//Ενδοθεματικός τελεστής βαθμωτή διαίρεση πινάκων  './'
	{type:'OPERATOR', name:'dotDivision', precedence:12, associativity:'left-to-right', str:'./'},
	//Ενδοθεματικός τελεστής υπόλοιπο διαίρεσης αριθμών  '%'
	{type:'OPERATOR', name:'remainder', precedence:12, associativity:'left-to-right', str:'%'},
	//Ενδοθεματικός τελεστής βαθμωτό υπόλοιπο διαίρεσης πινάκων   '.%'
	{type:'OPERATOR', name:'dotRemainder', precedence:12, associativity:'left-to-right', str:'.%'},
	//Ενδοθεματικός τελεστής mod   'mod'
	{type:'OPERATOR', name:'mod', precedence:12, associativity:'left-to-right', str:'mod'},
	//Ενδοθεματικός τελεστής div   'div'
	{type:'OPERATOR', name:'div', precedence:12, associativity:'left-to-right', str:'div'},
	
	//Ενδοθεματικός τελεστής πρόσθεση αριθμών  '+'
	{type:'OPERATOR', name:'addition', precedence:11, associativity:'left-to-right', str:'+'},
	//Ενδοθεματικός τελεστής αφαίρεση αριθμών  '-'
	{type:'OPERATOR', name:'subtraction', precedence:11, associativity:'left-to-right', str:'-'},
	//Ενδοθεματικός τελεστής βαθμωτός πρόσθεση πινάκων  '.+'
	{type:'OPERATOR', name:'dotAddition', precedence:11, associativity:'left-to-right', str:'.+'},
	//Ενδοθεματικός τελεστής βαθμωτή αφαίρεση πινάκων  '.-'
	{type:'OPERATOR', name:'dotSubtraction', precedence:11, associativity:'left-to-right', str:'./'},
	
	//Ενδοθεματικός τελεστής shift Left  '<<'
	{type:'OPERATOR', name:'leftShift', precedence:10, associativity:'left-to-right', str:'<<'},
	//Ενδοθεματικός τελεστής shift Right  '>>'
	{type:'OPERATOR', name:'rightShift', precedence:10, associativity:'left-to-right', str:'>>'},
	//Ενδοθεματικός τελεστής Unsigned right shift  '>>>'
	{type:'OPERATOR', name:'UnsignedRightShift', precedence:10, associativity:'left-to-right', str:'>>>'},
	
	//Ενδοθεματικός τελεστής  	Less than  '<'
	{type:'OPERATOR', name:'lessThan', precedence:9, associativity:'left-to-right', str:'<'},
	//Ενδοθεματικός τελεστής Less than or equal  '<='
	{type:'OPERATOR', name:'lessThanOrEqual', precedence:9, associativity:'left-to-right', str:'<='},
	//Ενδοθεματικός τελεστής Greater than  '>'
	{type:'OPERATOR', name:'greaterThan', precedence:9, associativity:'left-to-right', str:'>'},
	//Ενδοθεματικός τελεστής Greater than or equal  '>='
	{type:'OPERATOR', name:'greaterThanOrEqual', precedence:9, associativity:'left-to-right', str:'>='},
	
	//Ενδοθεματικός τελεστής  	Equality  '=='
	{type:'OPERATOR', name:'equality', precedence:8, associativity:'left-to-right', str:'=='},
	//Ενδοθεματικός τελεστής Inequality  '!='
	{type:'OPERATOR', name:'inequality', precedence:8, associativity:'left-to-right', str:'!='},
	//Ενδοθεματικός τελεστής Strict equality  '==='
	{type:'OPERATOR', name:'strictEquality', precedence:8, associativity:'left-to-right', str:'==='},
	//Ενδοθεματικός τελεστής Strict inequality  '!=='
	{type:'OPERATOR', name:'strictInequality', precedence:8, associativity:'left-to-right', str:'!=='},
	
	//Ενδοθεματικός τελεστής Bitwise AND  '&'
	{type:'OPERATOR', name:'bitwiseAND', precedence:7, associativity:'left-to-right', str:'&'},
	//Ενδοθεματικός τελεστής Bitwise XOR  '^'
	{type:'OPERATOR', name:'bitwiseXOR', precedence:6, associativity:'left-to-right', str:'^'},
	//Ενδοθεματικός τελεστής Bitwise OR  '|'
	{type:'OPERATOR', name:'bitwiseOR', precedence:5, associativity:'left-to-right', str:'|'},
	
	//Ενδοθεματικός τελεστής Logical AND  '&&'
	{type:'OPERATOR', name:'logicalAND', precedence:4, associativity:'left-to-right', str:'&&'},
	//Ενδοθεματικός τελεστής Logical OR  '||'
	{type:'OPERATOR', name:'logicalOR', precedence:3, associativity:'left-to-right', str:'||'},
	
	//Ενδοθεματικός τελεστής Assignment  ':='
	{type:'OPERATOR', name:'assignment', precedence:2, associativity:'right-to-left', str:':='},
	//Ενδοθεματικός τελεστής Addition assignment  '+='
	{type:'OPERATOR', name:'additionAssignment', precedence:2, associativity:'right-to-left', str:'+='},
	//Ενδοθεματικός τελεστής Subtraction assignment  '-='
	{type:'OPERATOR', name:'subtractionAssignment', precedence:2, associativity:'right-to-left', str:'-='},
	//Ενδοθεματικός τελεστής Exponentiation assignment  '**='
	{type:'OPERATOR', name:'exponentiationAssignment', precedence:2, associativity:'right-to-left', str:'**='},
	//Ενδοθεματικός τελεστής Multiplication assignment  '*='
	{type:'OPERATOR', name:'multiplicationAssignment', precedence:2, associativity:'right-to-left', str:'*='},
	//Ενδοθεματικός τελεστής Division assignment  '/='
	{type:'OPERATOR', name:'divisionAssignment', precedence:2, associativity:'right-to-left', str:'/='},
	//Ενδοθεματικός τελεστής Remainder assignment  '%='
	{type:'OPERATOR', name:'remainderAssignment', precedence:2, associativity:'right-to-left', str:'%='},
	//Ενδοθεματικός τελεστής Left shift assignment  '<<='
	{type:'OPERATOR', name:'leftShiftAssignment', precedence:2, associativity:'right-to-left', str:'%='},
	//Ενδοθεματικός τελεστής Right shift assignment  '>>='
	{type:'OPERATOR', name:'rightShiftAssignment', precedence:2, associativity:'right-to-left', str:'>>='},
	
	
	//Ενδοθεματικός τελεστής Unsigned right shift assignment  '>>>='
	{type:'OPERATOR', name:'unsignedRightShiftAssignment', precedence:2, associativity:'right-to-left', str:'>>>='},
	//Ενδοθεματικός τελεστής Bitwise AND assignment  '&='
	{type:'OPERATOR', name:'bitwiseAndAssignment', precedence:2, associativity:'right-to-left', str:'&='},
	//Ενδοθεματικός τελεστής Bitwise XOR assignment  '^='
	{type:'OPERATOR', name:'bitwiseXorAssignment', precedence:2, associativity:'right-to-left', str:'^='},
	//Ενδοθεματικός τελεστής Bitwise OR assignment  '|='
	{type:'OPERATOR', name:'bitwiseOrAssignment', precedence:2, associativity:'right-to-left', str:'|='},
	//Ενδοθεματικός τελεστής Logical AND assignment  '&&='
	{type:'OPERATOR', name:'logicalAndAssignment', precedence:2, associativity:'right-to-left', str:'&&='},
	//Ενδοθεματικός τελεστής Logical OR assignment '||='
	{type:'OPERATOR', name:'logicalOrAssignment', precedence:2, associativity:'right-to-left', str:'||='},
	
	//Ενδοθεματικός τελεστής Comma ','
	{type:'OPERATOR', name:'comma', precedence:1, associativity:'left-to-right', str:','},
	//Σύμβολο End of Command ';'
	{type:'SYMBOL', name:'endOfCommand', precedence:1, associativity:'right-to-left', str:';'},
	//Σύμβολο Void End of Command '$'
	{type:'SYMBOL', name:'voidEndOfCommand', precedence:1, associativity:'right-to-left', str:'$'},

	//Μιγαδική μονάδα
	{type:'CONST', name:'complexUnary', precedence:undefined, associativity:undefined, str:'i'},
	//e
	{type:'CONST', name:'const_e', precedence:undefined, associativity:undefined, str:'e'},
	//π
	{type:'CONST', name:'const_pi', precedence:undefined, associativity:undefined, str:'pi'},
	//true
	{type:'CONST', name:'const_true', precedence:undefined, associativity:undefined, str:'true'},
	//false
	{type:'CONST', name:'const_false', precedence:undefined, associativity:undefined, str:'false'},
	//Infinity
	{type:'CONST', name:'const_Infinity', precedence:undefined, associativity:undefined, str:'Infinity'},
	//NaN
	{type:'CONST', name:'const_NaN', precedence:undefined, associativity:undefined, str:'NaN'},
	
	//function
	{type:'WORD', name:'word_function', precedence:undefined, associativity:undefined, str:'function'},
	//return
	{type:'WORD', name:'word_return', precedence:undefined, associativity:undefined, str:'return'},
		
	];

/*Επιστρέφει την προτεραιότητα του συμβόλου αλλιώς undefined*/
function johnkscienceInterpreterTableOfSymbolsPrecedence(name){
	let len=johnkscienceInterpreterTableOfSymbols.length;
	for (let i=0; i<len; i++){
		if(johnkscienceInterpreterTableOfSymbols[i].name==name){
			return johnkscienceInterpreterTableOfSymbols[i].precedence;
		}
	}
}

/*Επιστρέφει την προσετεραιστικότητα του συμβόλου αλλιώς undefined*/
function johnkscienceInterpreterTableOfSymbolsassociativity(name){
	let len=johnkscienceInterpreterTableOfSymbols.length;
	for (let i=0; i<len; i++){
		if(johnkscienceInterpreterTableOfSymbols[i].name==name){
			return johnkscienceInterpreterTableOfSymbols[i].associativity;
		}
	}
}

/*ΣΑΡΩΤΗΣ / SCANER -  Μετατρέπει τον πηγαίο κώδικα σε λίστα λεκτικών σημείων
  Αφού αφαιρέσει τα σχόλια και τους λευκούς χαρακτήρες επιστρέφει πίνακα με 
  λεκτικά σημεία της μορφής
  
  {  type:'SYMBOL',				//τύπος συμβόλου  
	 name:'rightParenthesis',   //όνομα
	 precedence:18,				//προτεραιότητα 
	 associativity:undefined,   //προσετεριστικότητα
	 str:')'					//κείμενο
  }
 
  Για τα λεκτικά σημεία βλέπε τον πίνακα: johnkscienceInterpreterTableOfSymbols
  
  Για τυχόν μηνύματα λάθους βλέπε: johnkscienceInterpreterErrorHistory
  
  Στο όρισμα line περνάει ο αύξον αριθμός της εντολής που εκτελείται, αλλιώς undefined.
*/  
function johnkscienceInterpreterScan(source, line ){
		
		let buffer=source;
		
		let result2=[{type:'SYMBOL', name:'programBegin'}];
		
		if(buffer=="") return result2;
		
		let result=[];
		//Έλεγχος για συζυγία σχολίων και αφαίρεση τους 
		//από τον πηγαίο κώδικα.
		
		let nos=0; //αριθμός συμβόλων ανοίγματος
		let ncs=0; //αριθμός συμβόλων κλεισίματος
		let pos; //Σημείο συμβόλου ανοίγματος
		let pcs; //Σημείο συμβόλου κλεισίματος
		
		for(let i=0; i<buffer.length; i++){
			
			if(buffer.charAt(i)=='/' && buffer.charAt(i+1)=='*'){
				nos++;
				pos=i;
				//Δεύτερος χαρακτήρας ανοίγματος στην σειρά
				//Δεν επιτρέπονται εσωτερικά σχόλια
				if( nos-ncs  == 2 ){
					johnkscienceInterpreterErrorPush('SCANER:1', 'Μη σωστή συζυγία σχολίων. Αναμένεται */', line);
					return result;
				}
			}
			
			if(buffer.charAt(i)=='*' && buffer.charAt(i+1)=='/'){
				ncs++;
				pcs=i+2;
				if(nos == ncs) {
					buffer=buffer.substring(0, pos) + buffer.substring(pcs);
					nos=0;
					ncs=0;
					i=i-(pcs-pos);
				}else{
					johnkscienceInterpreterErrorPush('SCANER:2', 'Μη σωστή συζυγία σχολίων. Αναμένεται /*', line);
					return result;
				}
			}
		}
		
		if(nos > ncs) {
			johnkscienceInterpreterErrorPush('SCANER:3', 'Μη σωστή συζυγία σχολίων. Αναμένεται */', line);
			return result;
		} 
		if(nos < ncs) {
			johnkscienceInterpreterErrorPush('SCANER:4', 'Μη σωστή συζυγία σχολίων. Αναμένεται /*', line);
			return result;
		}
		
		//Έλεγχος για συζυγία παρενθέσεων
		let stack=[];
		for(let i=0; i<buffer.length; i++){
			if(buffer.charAt(i)=='('){
				stack.push('(');
			}else if(buffer.charAt(i)==')'){
				if(stack.pop()!='('){
					johnkscienceInterpreterErrorPush('SCANER:5', "Μη σωστή συζυγία παρενθέσεων. Αναμένεται (", line);
					return [{
						type:'SYMBOL',
						name:'programBegin',
						preference:undefined,
						associativity:undefined
					}];
				}
			}
		}
		if(stack.length!=0){
			johnkscienceInterpreterErrorPush('SCANER:5', "Μη σωστή συζυγία παρενθέσεων.", line);
					return [{
						type:'SYMBOL',
						name:'programBegin',
						preference:undefined,
						associativity:undefined
					}];
		}
		
		//Έλεγχος για συζυγία αλφαριθμητικών και αντικατάστασή τους 
		//στον πηγαίο κώδικα.
		
		let nss=0; //Αριθμός συμβόλων ανοίγματος και κλεισίματος αλφαριθμητικού
		let pss; //Θέση τελευταίου συμβόλου αλφαριθμητικού
		
		for(let i=0; i<buffer.length; i++){
			if(buffer.charAt(i)=='\''){
				pss=i;
				nss++;
			}
		}
		
		if(nss % 2 != 0){
			johnkscienceInterpreterErrorPush('SCANER:5', "Μη σωστή συζυγία χαρακτήρων αλφαριθμητικών. Αναμένεται '", line);
			return result;
		}
		
		/*Αφαιρώ τα αλφαριθμητικά από τον πηγαίο κώδικα και τα τοποθετώ
		στην λίστα stringList. Στην θέση του αλφαριθμητικού αντικαθιστώ 
		τον κωδικό STRING*/
		let stringList=[];
		let c1,c2;
		while((c1=buffer.indexOf('\''))>=0 && (c2=buffer.indexOf('\'',c1+1))>=0){
			stringList.push(buffer.substring(c1+1,c2));
			buffer=buffer.substring(0,c1) + " STRING " + buffer.substring(c2+1);
		}
		
		//Αναγνωρίζω τους αριθμούς (χωρίς το πρόσημο) από τον πηγαίο κώδικα,
		//τους τοποθετώ στην λίστα numberList, και αντικαταστώ τον αριθμό μέσα
		//στον πηγαίο κώδικα με τον κωδικό NUMBER
		let numberList=[]; //Λίστα αριθμών σε μορφή αλφαριθμητικών 
		let numberPatern= /([0-9]\d*)([.]\d*)?([eE][+-]?\d+)?/g;
		numberList=buffer.match(numberPatern);
		buffer=buffer.replaceAll(numberPatern," NUMBER ");
		
		
		//Για να διαχωρίσω το buffer στα λεκτικά σημεία με βάση τον 
		//διαχωριστικό χαρακτήρα " " πρέπει πρώτα α) να αφήσω κατάλληλα κενά πριν 
		//και μετά από τις παρενθέσεις β) να αποκόψω τα περιττά " ", γ) να  
		// αφαιρέσω τα κενά¨" " από την αρχή και το τέλος του buffer.
		
		buffer=buffer.replaceAll("("," SYMBOLleftParenthesis ");
		buffer=buffer.replaceAll(")"," SYMBOLrightParenthesis ");
		buffer=buffer.replaceAll("["," SYMBOLleftBracket ");
		buffer=buffer.replaceAll("]"," SYMBOLrightBracket ");
		buffer=buffer.replaceAll("{"," SYMBOLleftHooks ");
		buffer=buffer.replaceAll("}"," SYMBOLrightHooks ");
		
		//Τελεστές πολλών χαρακτήρων
		buffer=buffer.replaceAll("radToDegree"," FUNCTION0007 ");
		buffer=buffer.replaceAll("degreeToRad"," FUNCTION0008 ");
		buffer=buffer.replaceAll("gradToRad"," FUNCTION0009 ");
		buffer=buffer.replaceAll("radToGrad"," FUNCTION0010 ");
		buffer=buffer.replaceAll("factorial"," FUNCTION0011 ");
		
		//Τελεστές πέντε χαρακτήρων
		buffer=buffer.replaceAll("cross"," FUNCTION0012 ");
		buffer=buffer.replaceAll("inner"," FUNCTION0013 ");
		buffer=buffer.replaceAll("gamma"," FUNCTION0014 ");
		buffer=buffer.replaceAll("asinh"," FUNCTION0015 ");
		buffer=buffer.replaceAll("acosh"," FUNCTION0016 ");
		buffer=buffer.replaceAll("atanh"," FUNCTION0017 ");
		buffer=buffer.replaceAll("floor"," FUNCTION0037 ");
		buffer=buffer.replaceAll("round"," FUNCTION0039 ");
		buffer=buffer.replaceAll("polar"," FUNCTION0040 ");
		
		//Τελεστές τεσσάρων χαρακτήρων
		buffer=buffer.replaceAll(">>>="," OPERATORunsignedRightShiftAssignment ");
		buffer=buffer.replaceAll("root"," FUNCTION0018 ");
		buffer=buffer.replaceAll("sqrt"," FUNCTION0019 ");
		buffer=buffer.replaceAll("conj"," FUNCTION0020 ");
		buffer=buffer.replaceAll("loga"," FUNCTION0021 ");
		buffer=buffer.replaceAll("asin"," FUNCTION0022 ");
		buffer=buffer.replaceAll("acos"," FUNCTION0023 ");
		buffer=buffer.replaceAll("atan"," FUNCTION0024 ");
		buffer=buffer.replaceAll("sinh"," FUNCTION0025 ");
		buffer=buffer.replaceAll("cosh"," FUNCTION0026 ");
		buffer=buffer.replaceAll("tanh"," FUNCTION0027 ");
		buffer=buffer.replaceAll("ceil"," FUNCTION0038 ");
		buffer=buffer.replaceAll("rand"," FUNCTION0041 ");
		
		//Τελεστές τριών χαρακτήρων
		buffer=buffer.replaceAll("==="," OPERATORstrictEquality ");
		buffer=buffer.replaceAll("!=="," OPERATORstrictInequality ");
		buffer=buffer.replaceAll(">>>"," OPERATORunsignedRightShift ");
		buffer=buffer.replaceAll("**="," OPERATORexponentiationAssignment ");//
		buffer=buffer.replaceAll("neg"," OPERATORunaryNegation ");
		buffer=buffer.replaceAll("mod"," OPERATORmod ");
		buffer=buffer.replaceAll("div"," OPERATORdiv ");
		buffer=buffer.replaceAll("new"," OPERATORnew ");
		buffer=buffer.replaceAll("not"," OPERATORlogicalNotWord ");
		buffer=buffer.replaceAll(".**"," OPERATORdotExponentiation ");
		buffer=buffer.replaceAll("<<="," OPERATORleftShiftAssignment ");
		buffer=buffer.replaceAll(">>="," OPERATORrightShiftAssignment ");
		buffer=buffer.replaceAll("&&="," OPERATORlogicalAndAssignment ");
		buffer=buffer.replaceAll("||="," OPERATORlogicalOrAssignment ");
		buffer=buffer.replaceAll("sin"," FUNCTION0028 ");
		buffer=buffer.replaceAll("cos"," FUNCTION0029 ");
		buffer=buffer.replaceAll("tan"," FUNCTION0030 ");
		buffer=buffer.replaceAll("pow"," FUNCTION0031 ");
		buffer=buffer.replaceAll("arg"," FUNCTION0032 ");
		buffer=buffer.replaceAll("exp"," FUNCTION0033 ");
		buffer=buffer.replaceAll("log"," FUNCTION0034 ");
		buffer=buffer.replaceAll("abs"," FUNCTION0035 ");
		
		//Τελεστές δύο χαρακτήρων
		buffer=buffer.replaceAll(":="," OPERATORassignment ");//
		buffer=buffer.replaceAll("+="," OPERATORadditionAssignment ");//
		buffer=buffer.replaceAll("-="," OPERATORsubtractionAssignment ");//
		buffer=buffer.replaceAll("*="," OPERATORmultiplicationAssignment ");//
		buffer=buffer.replaceAll("/="," OPERATORdivisionAssignment ");//
		buffer=buffer.replaceAll("%="," OPERATORremainderAssignment ");//
		buffer=buffer.replaceAll(">="," OPERATORgreaterThan ");
		buffer=buffer.replaceAll("<="," OPERATORlessThan ");
		buffer=buffer.replaceAll("=="," OPERATORequality ");
		buffer=buffer.replaceAll("!="," OPERATORinequality");
		buffer=buffer.replaceAll(".+"," OPERATORdotAddition ");
		buffer=buffer.replaceAll(".-"," OPERATORdotSubtraction ");
		buffer=buffer.replaceAll(".*"," OPERATORdotMultiplication ");
		buffer=buffer.replaceAll("./"," OPERATORdotDivision ");
		buffer=buffer.replaceAll(".%"," OPERATORdotRemainder ");
		buffer=buffer.replaceAll("**"," OPERATORexponentiation ");
		buffer=buffer.replaceAll("++"," OPERATORincrement ");
		buffer=buffer.replaceAll("--"," OPERATORdecrement ");
		buffer=buffer.replaceAll(">>"," OPERATORleftShift ");
		buffer=buffer.replaceAll("<<"," OPERATORrightShift ");
		buffer=buffer.replaceAll("&&"," OPERATOlogicalAND ");
		buffer=buffer.replaceAll("||"," OPERATORlogicalOR ");
		buffer=buffer.replaceAll("&="," OPERATORbitwiseAndAssignment ");
		buffer=buffer.replaceAll("^="," OPERATORbitwiseXorAssignment ");
		buffer=buffer.replaceAll("|="," OPERATORbitwiseOrAssignment ");
		buffer=buffer.replaceAll("?."," OPERATORoptionalChaining ");
		buffer=buffer.replaceAll("ln"," FUNCTION0036 ");
		
		//Τελεστές ενός χαρακτήρα
		buffer=buffer.replaceAll("!"," OPERATORfactorial ");
		buffer=buffer.replaceAll(">"," OPERATORgreaterThan ");
		buffer=buffer.replaceAll("<"," OPERATORlessThan ");
		buffer=buffer.replaceAll("="," OPERATORequationEquality");
		buffer=buffer.replaceAll("%"," OPERATORremainder ");
		buffer=buffer.replaceAll("&"," OPERATORbitwiseAND ");
		buffer=buffer.replaceAll("|"," OPERATORbitwiseOR ");
		buffer=buffer.replaceAll("~"," OPERATORbitwiseNOT ");
		buffer=buffer.replaceAll("^"," OPERATORbitwiseXOR ");
		//buffer=buffer.replaceAll("?"," OPERATORquestionMark ");
		//buffer=buffer.replaceAll(":"," OPERATORcolon ");
		buffer=buffer.replaceAll("."," OPERATORdot ");
		buffer=buffer.replaceAll("+"," OPERATORplus ");
		buffer=buffer.replaceAll("-"," OPERATORminus ");
		buffer=buffer.replaceAll("*"," OPERATORmultiplication ");
		buffer=buffer.replaceAll("/"," OPERATORdivision ");
		buffer=buffer.replaceAll("_"," OPERATORfraction ");
		
		buffer=buffer.replaceAll(","," OPERATORcomma ");
		buffer=buffer.replaceAll(";"," SYMBOLendOfCommand ");
		buffer=buffer.replaceAll("$"," SYMBOLvoidEndOfCommand ");
		
		buffer=buffer.replaceAll(/[\n\t\f\r]/g," ");
		buffer=buffer.replaceAll(/[\s]+/g," ");
		buffer=buffer.trim();
		
		result=buffer.split(" ");
		
		//Αναγνωρίζω την φανταστική μονάδα, εσωτερικές σταθερές,
		//τελεστές λέξεις, δεσμευμένες λέξεις κτλ
		for(let i=0; i<result.length; i++){
			if(result[i]=='i') result[i]='CONSTcomplexUnary';
			if(result[i]=='e') result[i]='CONSTexp';
			if(result[i]=='pi') result[i]='CONSTpi';
			if(result[i]=='true') result[i]='CONSTtrue';
			if(result[i]=='false') result[i]='CONSTfalse';
			if(result[i]=='Infinity') result[i]='CONSTInfinity';
			if(result[i]=='NaN') result[i]='CONSTNaN';
			
			if(result[i]=='let') result[i]='WORDlet';
			if(result[i]=='function') result[i]='WORDfunction';
			if(result[i]=='return') result[i]='WORDreturn';
			
			if(result[i]=='mod') result[i]='OPERATORmod';
			if(result[i]=='rem') result[i]='OPERATORrem';
			if(result[i]=='div') result[i]='OPERATORdiv';
			
		}
		
		//Αναγνωρίζω ονόματα, όλα τα υπόλοιπα είναι ονόματα.
		let nameList=[];
		for(let i=0; i<result.length; i++){
			if(result[i]!='NUMBER' && result[i]!='STRING' && result[i].substring(0,6)!='SYMBOL' && result[i].substring(0,5)!='CONST' && result[i].substring(0,4)!='WORD' && result[i].substring(0,8)!='OPERATOR' && result[i].substring(0,8)!='FUNCTION') {
				nameList.push(result[i]);
				result[i]='NAME';
			}
		}
		
		
		//Αναγνωρίζω το αρνητικό πρόσημο από τον τελεστή της αφαίρεσης
		//Εάν μπροστά από το - είναι ( ή { ή [ ή , ή ; ή ΤΕΛΕΣΤΗΣ τότε
		//έχουμε ένα αρνητικό πρόσημο, αλλιώς είναι ο τελεστής της αφαίρεσης
		if(result[0]=='OPERATORminus') result[0]='OPERATORunaryNegation';
		for(let i=1; i<result.length; i++){
			if(result[i-1]=='OPERATORfactorial'){
				result[i]='OPERATORsubtraction';
			}else if( ((result[i-1]=='SYMBOLleftParenthesis' |
				result[i-1]=='SYMBOLrightParenthesis' |
				result[i-1]=='SYMBOLleftBracket' |
				result[i-1]=='SYMBOLrightBracket' |
				result[i-1]=='SYMBOLleftHooks' |
				result[i-1]=='SYMBOLrightHooks' |
				result[i-1]=='SYMBOLendOfCommand' |
				result[i-1]=='OPERATORcomma' |
				result[i-1].substring(0,8)=='OPERATOR') // &&
				  //result[i-1]!='OPERATORminus')
				  ) &&
				result[i]=='OPERATORminus'){
					result[i]='OPERATORunaryNegation';
			}else if(result[i]=='OPERATORminus'){
				result[i]='OPERATORsubtraction';
			}
		}
		
		//Αναγνωρίζω το θετικό πρόσημο από τον τελεστή της πρόσθεσης
		//Εάν μπροστά από το + είναι ( ή { ή [ ή , ή ; ή ΤΕΛΕΣΤΗΣ τότε
		//έχουμε ένα θετικό πρόσημο, αλλιώς είναι ο τελεστής της πρόσθεσης
		if(result[0]=='OPERATORplus') result[0]='OPERATORunaryPlus';
		for(let i=1; i<result.length; i++){
			if(result[i-1]=='OPERATORfactorial'){
				result[i]='OPERATORaddition';
			}else if( (
				
				(result[i-1]=='SYMBOLleftParenthesis' |
				result[i-1]=='SYMBOLRightParenthesis' |
				result[i-1]=='SYMBOLleftBracket' |
				result[i-1]=='SYMBOLrightBracket' |
				result[i-1]=='SYMBOLleftHooks' |
				result[i-1]=='SYMBOLrightHooks' |
				result[i-1]=='SYMBOLendOfCommand' |
				result[i-1]=='OPERATORcomma' |
				result[i-1].substring(0,8)=='OPERATOR') //&&
				
				//( result[i-1]!='OPERATORplus' &&
				  //result[i-1]!='OPERATORsubtraction')
				  
				) &&
				result[i]=='OPERATORplus'){
					result[i]='OPERATORunaryPlus';
			}else if(result[i]=='OPERATORplus'){
				result[i]='OPERATORaddition';
			}
		}
		
		//Ο τελεστής Postifix increment/decement έχει μεγαλύτερη προτεραιότητα
		//από τον Prefix increment/decement, επομένως τον αναγνωρίζουμε πρώτο
		for(let i=1; i<result.length; i++){
			if( result[i]=='OPERATORincrement' && (
				result[i-1].substring(0,6)=='NUMBER' ||
				result[i-1].substring(0,4)=='NAME' ||
				result[i-1]=='SYMBOLrightParenthesis' ||
				result[i-1]=='SYMBOLrightBracket' ||
				result[i-1]=='SYMBOLrightHooks')){
					result[i]='OPERATORpostfixIncrement'
			}else if( result[i]=='OPERATORdecrement' && (
				result[i-1].substring(0,6)=='NUMBER' ||
				result[i-1].substring(0,4)=='NAME' ||
				result[i-1]=='SYMBOLrightParenthesis' ||
				result[i-1]=='SYMBOLrightBracket' ||
				result[i-1]=='SYMBOLrightHooks')){
					result[i]='OPERATORpostfixDecrement'
			}else if( result[i]=='OPERATORincrement' && (
				result[i+1].substring(0,6)=='NUMBER' ||
				result[i+1].substring(0,4)=='NAME' ||
				result[i+1]=='SYMBOLleftParenthesis' ||
				result[i+1]=='SYMBOLleftBracket' ||
				result[i+1]=='SYMBOLleftHooks')){
					result[i]='OPERATORprefixIncrement'
			}else if( result[i]=='OPERATORdecrement' && (
				result[i+1].substring(0,6)=='NUMBER' ||
				result[i+1].substring(0,4)=='NAME' ||
				result[i+1]=='SYMBOLleftParenthesis' ||
				result[i+1]=='SYMBOLleftBracket' ||
				result[i+1]=='SYMBOLleftHooks')){
					result[i]='OPERATORprefixDecrement'
			}else{
				if(result[i]=='OPERATORdecrement'){ 
					result[i]='OPERATORPostfixdecrement';
				}else if(result[i]=='OPERATORincrement'){ 
					result[i]='OPERATORpostfixIncrement';
				} 
			}
		}
				
		
		//Τελικό στάδιο
		for(let i=0; i<result.length; i++){
			if(result[i].substring(0,6)=='SYMBOL'){
				result2.push({
					type:'SYMBOL', 
					name:result[i].substring(6), 
					precedence:johnkscienceInterpreterTableOfSymbolsPrecedence(result[i].substring(6)),
					associativity:johnkscienceInterpreterTableOfSymbolsassociativity(result[i].substring(6))
					});
			}else if(result[i].substring(0,5)=='CONST'){
				result2.push({
					type:'CONST', 
					name:result[i].substring(5),
					precedence:johnkscienceInterpreterTableOfSymbolsPrecedence(result[i].substring(5)),
					associativity:johnkscienceInterpreterTableOfSymbolsassociativity(result[i].substring(5))
				});
			}else if(result[i].substring(0,8)=='OPERATOR'){
				result2.push({
					type:'OPERATOR', 
					name:result[i].substring(8),
					precedence:johnkscienceInterpreterTableOfSymbolsPrecedence(result[i].substring(8)),
					associativity:johnkscienceInterpreterTableOfSymbolsassociativity(result[i].substring(8))
				});
			}else if(result[i].substring(0,4)=='WORD'){
				result2.push({
					type:'WORD', 
					name:result[i].substring(4),
					precedence:johnkscienceInterpreterTableOfSymbolsPrecedence(result[i].substring(4)),
					associativity:johnkscienceInterpreterTableOfSymbolsassociativity(result[i].substring(4))
				});
			}else if(result[i].substring(0,8)=='FUNCTION'){
				result2.push({
					type:'FUNCTION', 
					name:result[i].substring(8),
					precedence:johnkscienceInterpreterTableOfSymbolsPrecedence(result[i].substring(8)),
					associativity:johnkscienceInterpreterTableOfSymbolsassociativity(result[i].substring(8))
				});
			}else if(result[i]=='NUMBER'){
				result2.push({
					type:'NUMBER', 
					name:numberList.shift(),
					precedence:undefined,
					associativity:undefined
				});
			}else if(result[i]=='NAME'){
				result2.push({
					type:'NAME', 
					name:nameList.shift(),
					precedence:undefined,
					associativity:undefined
				});
			}else if(result[i]=='STRING'){
				result2.push({
					type:'STRING', 
					name:stringList.shift(),
					precedence:undefined,
					associativity:undefined
				});
			}
		}
		
		return result2;
		
}

/*ΔΙΕΡΜΗΝΕΥΤΗΣ ΕΝΤΟΛΗΣ- Ελέγχει για πιθανά συντακτικά λάθη και υπολογίζει την 
  μαθηματική έκφραση. 
  
  Δέχεται σαν είσοδο τον πίνακα λεκτικών σημείων που επιστρέφει η johnkscienceInterpreterScan. Βλέπε και johnkscienceInterpreterTableOfSymbols
  
  Επιστρέφει έναν αριθμό COMPLEXREC σε μορφή αλφαριθμητικού ή undefiened.
  
  Προωθεί τα μηνύματα λάθους στο μητρώο johnkscienceInterpreterErrorHistory.
  
  Ακολουθούν οι συντακτικοί κανόνες αυτής της Γλώσσας.
  
  Αντικείμενα
	Αριθμοί 	'2.3e-4', '2.34E5'
	Κλάσματα	'2_3' 
	Μιγαδικοί	'2+3*i'
  
  Αριθμητικοί τελεστές
	'+' πρόσθεση, π.χ. 2+3 --> 5
	'-' αφαίρεση, π.χ. 2-3 --> -1
	'*' πολλαπλασιασμός, π.χ. 2*3 --> 6
	'/' διαίρεση, π.χ. 6/3 --> 2
	'**' ύψωση σε δύναμη, π.χ. 2**3 --> 8
	'%' ακέραιο υπόλοιπο, π.χ. (3+4*i)%(1+2*i) --> 1+0*i
	'mod' ακέραιο υπόλοιπο, π.χ. (3+4*i)mod(1+2*i) --> 1+0*i
	'div' ακέραιο πηλίκο, π.χ. (3+4*i)div(1+2*i) --> 2+0*i
	'!' παραγοντικό, π.χ. 2.3!

  Πρόσημα
	'+' θετικό πρόσημο, π.χ. +(+45) --> 45
	'-' αρνητικό πρόσημο, π.χ. -(-45) --> 45

  Απόδοση τιμής
     ':=' απόδοση τιμής σε μεταβλητή, π.χ. x:=5 --> 5

  Ομαδοποίηση με παρενθέσεις
	'(' και ')', π.χ. (x:=1)+(x*3+45-3**(x+1)) --> 40 
  
  Τελεστής ',' 
     διαχωρίζει τιμές, π.χ. sin(2,3)
	 
  Ενσωματωμένες συναρτήσεις
	'sqrt(arg)' επιστρέφει την τετραγωνική ρίζα του ορίσματος
	'pow(base, exp)' επιστρέφει το αποτέλεσμα της δύναμης base**exp 
	'sin(arg)' επιστρέφει το αποτέλεσμα του ημίτονου, το arg σε rad
	'cos(arg)' επιστρέφει το αποτέλεσμα του συνημίτονου, το arg σε rad
	'tan(arg)' επιστρέφει το αποτέλεσμα της εφαπτομένης, το arg σε rad
	'asin(arg)'
	'acos(arg)'
	'atan(arg)'
	'sinh(arg)'
	'cosh(arg)'
	'tanh(arg)'
	'asinh(arg)'
	'acosh(arg)'
	'atanh(arg)'
	'conj(arg)'
	'arg(arg)'
	'abs(arg)'
	'root(base, exp)'
	'inner(lhs, rhs)'
	'cross(lhs, rhs)'
	'exp(arg)'
	'ln(arg)'
	'log(arg)'
	'loga(arg)'
	'radToDegree(rad)'
	'degreeToRad(degree)'
	'radToGrad(rad)'
	'gradToRad(grad)'
	'gamma(arg)'
	'factorial(arg)'
	'floor(arg)'
	'ceil(arg)'
	'round(arg)'
	'polar(mod, arg)'
	'rand()'
	
	
  Σταθερές
	'pi' ο αριθμός π
	'e' ο αριθμός e 
	
  Στην μεταβλητή variable αντιστοιχεί το μητρώο των μεταβλητών.
  
  Στο όρισμα line περνάει ο αύξον αριθμός της εντολής που εκτελείται, αλλιώς undefined.
	  
*/
function johnkscienceInterpreterRunCommand(command, variable, line){
	let buffer=command; //Η λίστα με τα λεκτικά σημεία
	
	{//Μετατρέπει την ενδοθεματική (Infix) σημειογραφία σε επιθεματική (Postfix)
	//σύμφωνα με τον παρακάτω αλγόριθμο
	
	//Scan the infix expression from left to right. 
    //If the scanned character is an operand, put it in the postfix expression. 
    //Otherwise, do the following
        //If the precedence and associativity of the scanned operator are greater than the precedence and associativity of the operator in the stack [or the stack is empty or the stack contains a ‘(‘ ], then push it in the stack. [‘^‘ operator is right associative and other operators like ‘+‘,’–‘,’*‘ and ‘/‘ are left-associative].
            //Check especially for a condition when the operator at the top of the stack and the scanned operator both are ‘^‘. In this condition, the precedence of the scanned operator is higher due to its right associativity. So it will be pushed into the operator stack. 
            //In all the other cases when the top of the operator stack is the same as the scanned operator, then pop the operator from the stack because of left associativity due to which the scanned operator has less precedence. 
        //Else, Pop all the operators from the stack which are greater than or equal to in precedence than that of the scanned operator.
            //After doing that Push the scanned operator to the stack. (If you encounter parenthesis while popping then stop there and push the scanned operator in the stack.) 
    //If the scanned character is a ‘(‘, push it to the stack. 
    //If the scanned character is a ‘)’, pop the stack and output it until a ‘(‘ is encountered, and discard both the parenthesis. 
    //Repeat steps 2-5 until the infix expression is scanned. 
    //Once the scanning is over, Pop the stack and add the operators in the postfix expression until it is not empty.
    //Finally, print the postfix expression.
	//https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/?ref=oin_asr1
	}
	let postfix=[];
	let stack=[];
	for(let i=1; i<buffer.length; i++){
		
		//Αν είναι τελεστέος τον προωθώ στην postfix[]
		if( buffer[i].type=='NUMBER' || 
			buffer[i].type=='NAME' || 
			buffer[i].type=='CONST'){
				postfix.push(buffer[i]);
		
		//Αν είναι '!' την προωθώ στην στοίβα
		}else if( buffer[i].name=='factorial'){
				stack.push(buffer[i]);
		
		//Αν είναι '(' την προωθώ στην στοίβα
		}else if( buffer[i].name=='leftParenthesis'){
				stack.push(buffer[i]);
				
		//Αν είναι ')' εξάγω όλη την στοίβα στην postfix μέχρι
		//να συναντήσει '('
		}else if( buffer[i].name=='rightParenthesis'){
			while(stack.length>0){
				if(stack[stack.length-1].name == 'leftParenthesis'){
						stack.pop();
						break;
				}
				postfix.push(stack.pop());
			}
			
			
		//Αν είναι τελεστής
		}else{
			//Αν η στοίβα είναι άδεια τοποθετώ τον τελεστή
			if(stack.length==0){
				stack.push(buffer[i]);
			//Αν η προτεραιότητα του τελεστή είναι μεγαλύτερη από αυτή
			//του τελεστή στην κορυφή της στοίβας τοποθετώ τον τελεστή
			//στην κορυφή της στοίβας
			}else if(buffer[i].precedence > stack[stack.length-1].precedence){
				stack.push(buffer[i]);
			//Αν η προτεραιότητα του τελεστή είναι μικρότερη από αυτή
			//του τελεστή στην κορυφή της στοίβας τοποθετώ τον τελεστή
			//στην κορυφή της στοίβας αφού μετακινήσω όλους τους μεγαλύτερους
			//τελεστές στην postfix
			}else if(buffer[i].precedence < stack[stack.length-1].precedence){
				while(stack.length>0){
					if(stack[stack.length-1].name == 'leftParenthesis'){
						stack.pop();
						break;
					}
					
					if(buffer[i].precedence > stack[stack.length-1].precedence){ 	break;
					}
					postfix.push(stack.pop());
				}
				stack.push(buffer[i]);
			//Αν η προτεραιότητα του τελεστή είναι ίση με αυτή
			//του τελεστή στην κορυφή της στοίβας ελέγχω την προσετεριστικότητα
			}else if(buffer[i].precedence == stack[stack.length-1].precedence){
				if(buffer[i].associativity == 'left-to-right'){
					postfix.push(stack.pop());
					stack.push(buffer[i]);
				}else if (buffer[i].associativity=='right-to-left'){
					stack.push(buffer[i]);
				} 
			
			}
			
		}
		
	}
	
	while(stack.length > 0){
		postfix.push(stack.pop());
		}
		
		
	//console.log(buffer);	
	//console.log(postfix);
	
	//Υπολογίζει την εντολή σε επιθεματική σημειογραφία (postfix)
	stack=[];
	let lhs, rhs, res;
	let arg1, arg2, arg3, arg4, arg5;
	//let variable=vars;//[{name:'ans', value:'0'}];
	function variableSet(name, value){
			for(let i=0; i<variable.length; i++){
				if(variable[i].name == name){
					variable[i].value=value;
				}else{
					variable.push( {name:name, value:value} );
				}
 			}
	}
	function variableGet(name){
		for(let i=0; i<variable.length; i++){
			if(variable[i].name == name){
				return variable[i].value;
			}
 		}
		return undefined;
	}
	function valueGet(token){
		if(token==undefined){
			return undefined;
		}else if(token.type=='NUMBER'){
			return token.name;
		}else if(token.type == 'NAME'){
			return variableGet(token.name);
		}
		return undefined;
	}
	
	for(let i=0; i<postfix.length; i++){
		if( postfix[i].type=='NUMBER'){
			stack.push({
				type:'NUMBER',
				name:johnkscienceMathScientificTo(postfix[i].name),
				preference: undefined,
				associativity: undefined
			});
		}else if( postfix[i].type=='NAME'){
			stack.push(postfix[i]);
		}else if( postfix[i].type=='FUNCTION'){
		switch(postfix[i].name){
				case '0019':{ //sqrt
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:50', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecRoot(arg1,2,0),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:51', 'Λάθος στον υπολογισμό της τετραγωνικής ρίζας', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0031':{ //pow
					arg1=valueGet(stack.pop());
					arg2=valueGet(stack.pop());
						if(arg1 == undefined || arg1 == undefined ){
								johnkscienceInterpreterErrorPush('RUNTIME:58', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecPow2(arg2, arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:59', 'Λάθος στον υπολογισμό της συνάρτησης pow', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0028':{ //sin
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:52', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecSin(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:53', 'Λάθος στον υπολογισμό του ημίτονου', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0029':{ //cos
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:54', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecCos(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:55', 'Λάθος στον υπολογισμό του συνημιτόνου', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0030':{ //tan
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:56', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecTan(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(johnkscienceSyntaxIsNaN(res.name)){
							johnkscienceInterpreterErrorPush('RUNTIME:57', 'Λάθος στον υπολογισμό της εφαπτομένης', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0022':{ //asin
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:60', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecAsin(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:61', 'Λάθος στον υπολογισμό της asin', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0023':{ //acos
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:62', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecAcos(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:63', 'Λάθος στον υπολογισμό της acos', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0024':{ //atan
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:64', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecAtan(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:65', 'Λάθος στον υπολογισμό της atan', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0025':{ //sinh
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:66', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecSinh(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:67', 'Λάθος στον υπολογισμό της sinh', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0026':{ //cosh
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:68', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecCosh(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:69', 'Λάθος στον υπολογισμό της cosh', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0027':{ //tanh
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:70', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecTanh(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:71', 'Λάθος στον υπολογισμό της tanh', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0015':{ //asinh
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:72', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecAsinh(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:73', 'Λάθος στον υπολογισμό της asinh', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0016':{ //acosh
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:74', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecAcosh(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:75', 'Λάθος στον υπολογισμό της acosh', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0017':{ //atanh
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:76', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecAtanh(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:77', 'Λάθος στον υπολογισμό της atanh', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0020':{ //conj
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:78', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecConjugate(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:79', 'Λάθος στον υπολογισμό της conj', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0032':{ //arg
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:80', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecArgument(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:81', 'Λάθος στον υπολογισμό της arg', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0035':{ //abs
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:82', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecModulus(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:83', 'Λάθος στον υπολογισμό της abs', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0033':{ //exp
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:84', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecExp(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:85', 'Λάθος στον υπολογισμό της exp', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0036':{ //ln
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:86', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecLn(arg1,0),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:87', 'Λάθος στον υπολογισμό της ln', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0034':{ //log
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:88', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecLog(arg1,0),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:89', 'Λάθος στον υπολογισμό της log', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0007':{ //radToDegree
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:90', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecRadToDegree(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:91', 'Λάθος στον υπολογισμό της radToDegree', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0008':{ //degreeToRad
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:92', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecDegreeToRad(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:93', 'Λάθος στον υπολογισμό της degreeToRad', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0010':{ //gradToRad
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:94', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecGradToRad(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:95', 'Λάθος στον υπολογισμό της gradToRad', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0009':{ //radToGrad
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:96', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecRadToGrad(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:97', 'Λάθος στον υπολογισμό της radToGrad', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0014':{ //gamma
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:98', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecGammaLanczos(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:99', 'Λάθος στον υπολογισμό της gamma', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0011':{ //factorial
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:48', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecFactorial(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:49', 'Λάθος στον υπολογισμό της factorial', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0037':{ //floor
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:46', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecFloor(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:47', 'Λάθος στον υπολογισμό της floor', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0038':{ //ceil
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:44', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecCeil(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:45', 'Λάθος στον υπολογισμό της ceil', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0039':{ //round
					arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:42', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecRound(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:43', 'Λάθος στον υπολογισμό της round', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0018':{ //root
					arg1=valueGet(stack.pop());
					arg2=valueGet(stack.pop());
						if(arg1 == undefined || arg1 == undefined ){
								johnkscienceInterpreterErrorPush('RUNTIME:40', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecRoot(arg2, arg1, '0'),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:41', 'Λάθος στον υπολογισμό της συνάρτησης root', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0012':{ //cross
					arg1=valueGet(stack.pop());
					arg2=valueGet(stack.pop());
						if(arg1 == undefined || arg1 == undefined ){
								johnkscienceInterpreterErrorPush('RUNTIME:38', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecCross(arg2, arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:39', 'Λάθος στον υπολογισμό της συνάρτησης cross', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0013':{ //inner
					arg1=valueGet(stack.pop());
					arg2=valueGet(stack.pop());
						if(arg1 == undefined || arg1 == undefined ){
								johnkscienceInterpreterErrorPush('RUNTIME:36', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecInner(arg2, arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:37', 'Λάθος στον υπολογισμό της συνάρτησης inner', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0021':{ //loga
					arg1=valueGet(stack.pop());
					arg2=valueGet(stack.pop());
						if(arg1 == undefined || arg1 == undefined ){
								johnkscienceInterpreterErrorPush('RUNTIME:34', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecLoga(arg2, arg1, 0),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:35', 'Λάθος στον υπολογισμό της συνάρτησης loga', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0040':{ //polar
					arg1=valueGet(stack.pop());
					arg2=valueGet(stack.pop());
						if(arg1 == undefined || arg1 == undefined ){
								johnkscienceInterpreterErrorPush('RUNTIME:32', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecPolar(arg2, arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:33', 'Λάθος στον υπολογισμό της συνάρτησης polar', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case '0041':{ //rand
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecRandom(),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:31', 'Λάθος στον υπολογισμό της συνάρτησης rand', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				
			}
		}else if( postfix[i].type=='CONST'){
			switch(postfix[i].name){
				case 'pi':{ 
					stack.push({
						type:'NUMBER',
						name:johnkscienceMathConstantPI,
						precedence:undefined,
						associativity:undefined
					});
					break;
				}
				case 'exp':{ 
					stack.push({
						type:'NUMBER',
						name:johnkscienceMathConstantE,
						precedence:undefined,
						associativity:undefined
					});
					break;
				}
				case 'complexUnary':{ 
					stack.push({
						type:'NUMBER',
						name:'&1',
						precedence:undefined,
						associativity:undefined
					});
					break;
				}
			}
		}else if( postfix[i].type=='WORD'){
		}else if( postfix[i].type=='SYMBOL'){
		}else if( postfix[i].type=='OPERATOR'){
			switch(postfix[i].name){
				case 'addition':{
						rhs=valueGet(stack.pop());
						lhs=valueGet(stack.pop());
						if(lhs == undefined || rhs == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:1', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecAdd(lhs, rhs),
							precedence: undefined,
							associative: undefined
						}
						stack.push(res);
						break;
				}
				case 'subtraction':{
						rhs=valueGet(stack.pop());
						lhs=valueGet(stack.pop());
						if(lhs == undefined || rhs == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:2', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecSub(lhs, rhs),
							precedence: undefined,
							associative: undefined
						}
						stack.push(res);
						break;
				}
				case 'multiplication':{
						rhs=valueGet(stack.pop());
						lhs=valueGet(stack.pop());
						if(lhs == undefined || rhs == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:3', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecMult(lhs, rhs),
							precedence: undefined,
							associative: undefined
						}
						stack.push(res);
						break;
				}
				case 'division':{
						rhs=valueGet(stack.pop());
						lhs=valueGet(stack.pop());
						if(lhs == undefined || rhs == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:4', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						if(johnkscienceMathComplexRecIsZero(rhs)){
								johnkscienceInterpreterErrorPush('RUNTIME:5', 'Διαίρεση με το μηδέν', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecDiv(lhs, rhs),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:6', 'Λάθος στην διαίρεση', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case 'fraction':{
					rhs=valueGet(stack.pop());
					lhs=valueGet(stack.pop());
					if(lhs == undefined || rhs == undefined){
							johnkscienceInterpreterErrorPush('RUNTIME:6', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
							return undefined;
					}
					if(johnkscienceMathComplexRecIsZero(rhs)){
							johnkscienceInterpreterErrorPush('RUNTIME:7', 'Διαίρεση με το μηδέν', line);
							return undefined;
					}
					res={
						type:'NUMBER', 
						name:johnkscienceMathComplexRecDiv(lhs, rhs),
						precedence: undefined,
						associative: undefined
					}
					if(res.name=='NaN'){
						johnkscienceInterpreterErrorPush('RUNTIME:6', 'Λάθος στην διαίρεση', line);
						return undefined;
					}
					stack.push(res);
					break;
				}
				case 'exponentiation':{
						rhs=valueGet(stack.pop());
						lhs=valueGet(stack.pop());
						if(lhs == undefined || rhs == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:8', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						if(johnkscienceMathComplexRecIsZero(rhs) && johnkscienceMathComplexRecIsZero(lhs)){
								johnkscienceInterpreterErrorPush('RUNTIME:9', 'Μορφή 0**0', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecPow2(lhs, rhs),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:10', 'Λάθος στην δύναμη', line);
							return undefined;
						}
						stack.push(res);
						break;
				}
				case 'unaryNegation':{
						rhs=valueGet(stack.pop());
						if(rhs == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:11', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecOpposite(rhs),
							precedence: undefined,
							associative: undefined
						}
						stack.push(res);
						break;
				}
				case 'unaryPlus':{
						rhs=valueGet(stack.pop());
						if(rhs == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:12', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:rhs,
							precedence: undefined,
							associative: undefined
						}
						stack.push(res);
						break;
				}
				case 'remainder':{
					rhs=valueGet(stack.pop());
					lhs=valueGet(stack.pop());
					if(lhs == undefined || rhs == undefined){
							johnkscienceInterpreterErrorPush('RUNTIME:13', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
							return undefined;
					}
					if(johnkscienceMathComplexRecIsZero(rhs)){
							johnkscienceInterpreterErrorPush('RUNTIME:14', 'Διαίρεση με το μηδέν', line);
							return undefined;
					}
					res={
						type:'NUMBER', 
						name:johnkscienceMathComplexRecReminder(lhs, rhs),
						precedence: undefined,
						associative: undefined
					}
					if(res.name=='NaN'){
						johnkscienceInterpreterErrorPush('RUNTIME:15', 'Λάθος στο υπόλοιπο της διαίρεσης', line);
						return undefined;
					}
					stack.push(res);
					break;
				}
				case 'mod':{
					rhs=valueGet(stack.pop());
					lhs=valueGet(stack.pop());
					if(lhs == undefined || rhs == undefined){
							johnkscienceInterpreterErrorPush('RUNTIME:16', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
							return undefined;
					}
					if(johnkscienceMathComplexRecIsZero(rhs)){
							johnkscienceInterpreterErrorPush('RUNTIME:17', 'Διαίρεση με το μηδέν', line);
							return undefined;
					}
					res={
						type:'NUMBER', 
						name:johnkscienceMathComplexRecReminder(lhs, rhs),
						precedence: undefined,
						associative: undefined
					}
					if(res.name=='NaN'){
						johnkscienceInterpreterErrorPush('RUNTIME:18', 'Λάθος στο υπόλοιπο της διαίρεσης', line);
						return undefined;
					}
					stack.push(res);
					break;
				}
				case 'div':{
					rhs=valueGet(stack.pop());
					lhs=valueGet(stack.pop());
					if(lhs == undefined || rhs == undefined){
							johnkscienceInterpreterErrorPush('RUNTIME:19', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
							return undefined;
					}
					if(johnkscienceMathComplexRecIsZero(rhs)){
							johnkscienceInterpreterErrorPush('RUNTIME:20', 'Διαίρεση με το μηδέν', line);
							return undefined;
					}
					res={
						type:'NUMBER', 
						name:johnkscienceMathComplexRecQuotient(lhs, rhs),
						precedence: undefined,
						associative: undefined
					}
					if(res.name=='NaN'){
						johnkscienceInterpreterErrorPush('RUNTIME:21', 'Λάθος στο πηλίκο της διαίρεσης', line);
						return undefined;
					}
					stack.push(res);
					break;
				}
				case 'assignment':{
						rhs=valueGet(stack.pop());
						lhs=stack.pop();
						if(lhs.type != 'NAME'){
								johnkscienceInterpreterErrorPush('RUNTIME:22', 'Αναμένεται ΜΕΤΑΒΛΗΤΗ', line);
								return undefined;
						}
						if(rhs == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:23', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:rhs,
							precedence: undefined,
							associative: undefined
						}
						//ενημερώνει το μητρώο μεταβλητών
						variableSet(lhs.name, rhs);
						stack.push(res);
						break;
				}
				case 'comma':{
						rhs=valueGet(stack.pop());
						lhs=valueGet(stack.pop());
						if(rhs == undefined || lhs == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:24', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						stack.push({
							type:'NUMBER',
							name:lhs,
							preference:undefined,
							associativity:undefined
						});
						stack.push({
							type:'NUMBER',
							name:rhs,
							preference:undefined,
							associativity:undefined
						});
						break;
				}
				case 'factorial':{
						arg1=valueGet(stack.pop());
						if(arg1 == undefined){
								johnkscienceInterpreterErrorPush('RUNTIME:25', 'Αναμένεται ΑΡΙΘΜΟΣ', line);
								return undefined;
						}
						res={
							type:'NUMBER', 
							name:johnkscienceMathComplexRecFactorial(arg1),
							precedence: undefined,
							associative: undefined
						}
						if(res.name=='NaN'){
							johnkscienceInterpreterErrorPush('RUNTIME:26', 'Λάθος στον υπολογισμό του παραγοντικού', line);
							return undefined;
						}
						stack.push(res);
						break;
				}	
				
			}
		}else{
		}
	}
	
	//Αν λείπει ένα τελικό ;
	if(stack.length > 1){
		johnkscienceInterpreterErrorPush('RUNTIME:101', 'Συντακτικό λάθος', line);
		return undefined;
	}else if(stack.length == 1){
		return stack[0].name;
	}
	
}

/*ΔΙΕΡΜΗΝΕΥΤΗΣ - Διερμηνεύει το πρόγραμμα εντολή προς εντολή,
  
  Για το συντακτικό κάθε εντολής βλέπε 	johnkscienceInterpreterRunCommand
  
  Κάθε εντολή τελειώνει με τους χαρακτήρες ';' ή '$' αλλά αυτοί οι
  χαρακτήρες δεν είναι μέρος της εντολής. 
  Αν η εντολή τελειώνει με τον ';' τότε το αποτέλεσμα αποθηκεύεται
  στην λίστα των αποτελεσμάτων ενώ αν τελειώνει με τον '$' τότε δεν 
  αποθηκεύεται.
  
  Επιστρέφει ένα πίνακα με τα αριθμητικά αποτελέσματα.
  
  Αν προκύψει λάθος τότε το αποτέλεσμα είναι undefined και 
  έχει ενημερωθεί το μητρώο των μηνυμάτων.
  
	*/
function johnkscienceInterpreterRunProgram(program){
	let variable=[{name:'ans', value:'0'}];
	let result=[];
	let buffer=program;
	
	//Αφαιρεί τους λευκούς χαρακτήρες από τα δύο άκρα.
	buffer=buffer.trim();
	
	//εάν το πρόγραμμα είναι άδειο.
	if(buffer=='') return result;
	
	//Προσθέτει ένα τελικό ; αν δεν υπάρχει τίποτα
	if(buffer.charAt(buffer.length-1) != ';' && buffer.charAt(buffer.length-1) != '$') buffer+=';';
	
	//Διαχωρίζει τις εντολές του προγράμματος και αν
	//τελειώνει σε ; τότε τυπώνει το αποτέλεσμα ενώ
	//αν τελειώνει σε $ δεν το τυπώνει.
	let command="";
	let l=0;//Αύξον Αριθμός εντολής
	let r;
	for(let i=0; i<buffer.length; i++){
		if(buffer.charAt(i)!=';' && buffer.charAt(i)!='$'){
			command+=buffer.charAt(i);
		}else if(buffer.charAt(i)==';'){
			//console.log(command);
			command=command.trim();
			l++;
			if(command!=''){
				r=johnkscienceInterpreterRunCommand(			johnkscienceInterpreterScan(command, l), variable, l);
				if(r==undefined){
					result.push(r);
					//return result;
				}else{
					result.push(r);
				}
			}
			command="";
		}else if(buffer.charAt(i)=='$'){
			//console.log(command);
			command=command.trim();
			l++
			if(command!=''){
				r=johnkscienceInterpreterRunCommand(			johnkscienceInterpreterScan(command, l), variable, l);
				if(r==undefined){
					return result;
				}else{
				}
			}
			command="";
		}
	}

	
	return result;
}