use strict;
use warnings;

my %ndcHash;

open (DRUG, "drugs.properties");
open (NEWDRUG, ">newDrugs.properties");
while (<DRUG>){
	my @splitLine = split(/\=/,$_);
	if (not defined $ndcHash{$splitLine[0]}){
	   $ndcHash{$splitLine[0]}=1;
	   print NEWDRUG $_;
	}
}
	