export enum TableContent {
  pdbID = "{\"attrID\":\"pdbID\",\"attrName\":\"PDB ID\",\"attrType\":\"meta\",\"isOperator\":false,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  authorName = "{\"attrID\":\"authorName\",\"attrName\":\"Author name\",\"attrType\":\"meta\",\"isOperator\":true,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  pdbDeposition = "{\"attrID\":\"pdbDeposition\",\"attrName\":\"PDB deposition\",\"attrType\":\"meta\",\"isOperator\":true,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":2}",
  keyword = "{\"attrID\":\"keyword\",\"attrName\":\"Keyword\",\"attrType\":\"meta\",\"isOperator\":false,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":1}",
  expMethod = "{\"attrID\":\"expMethod\",\"attrName\":\"Experimental method\",\"attrType\":\"meta\",\"isOperator\":false,\"conditions\":[{\"value\":\"any\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}",
  molType = "{\"attrID\":\"molType\",\"attrName\":\"Molecule type\",\"attrType\":\"meta\",\"isOperator\":false,\"conditions\":[{\"value\":\"any\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}",
  seqOfTetrads = "{\"attrID\":\"seqOfTetrads\",\"attrName\":\"Seq. of tetrads\",\"attrType\":\"struct\",\"isOperator\":false,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  seqOfQuad = "{\"attrID\":\"seqOfQuad\",\"attrName\":\"Seq. of quadruplexes\",\"attrType\":\"struct\",\"isOperator\":false,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  ions = "{\"attrID\":\"ions\",\"attrName\":\"Ions\",\"attrType\":\"struct\",\"isOperator\":false,\"conditions\":[{\"value\":\"any\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}",
  typeNoStrands = "{\"attrID\":\"typeNoStrands\",\"attrName\":\"Type (no. of strands)\",\"attrType\":\"struct\",\"isOperator\":false,\"conditions\":[{\"value\":\"any\",\"operator\":\"\"},{\"value\":\"unimolecular\",\"operator\":\"\"},{\"value\":\"bimolecular\",\"operator\":\"\"},{\"value\":\"tetramolecular\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}",
  noOfTetrads = "{\"attrID\":\"noOfTetrads\",\"attrName\":\"No. of tetrads\",\"attrType\":\"struct\",\"isOperator\":true,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  gtractSeq = "{\"attrID\":\"gtractSeq\",\"attrName\":\"G-tract sequence\",\"attrType\":\"struct\",\"isOperator\":false,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  loopLen = "{\"attrID\":\"loopLen\",\"attrName\":\"Loop length\",\"attrType\":\"struct\",\"isOperator\":true,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":2}",
  bulges = "{\"attrID\":\"bulges\",\"attrName\":\"Bulges\",\"attrType\":\"struct\",\"isOperator\":false,\"conditions\":[{\"value\":\"any\",\"operator\":\"\"},{\"value\":\"with bulges\",\"operator\":\"\"},{\"value\":\"without bulges\",\"operator\":\"\"}],\"rowType\":\"radioSelect\",\"maxCondCount\":0}",
  vLoops = "{\"attrID\":\"vLoops\",\"attrName\":\"V-Loops\",\"attrType\":\"struct\",\"isOperator\":false,\"conditions\":[{\"value\":\"any\",\"operator\":\"\"},{\"value\":\"with V-Loops\",\"operator\":\"\"},{\"value\":\"without V-Loops\",\"operator\":\"\"}],\"rowType\":\"radioSelect\",\"maxCondCount\":0}",
  webbaDaSilva = "{\"attrID\":\"webbaDaSilva\",\"attrName\":\"Webba da Silva class\",\"attrType\":\"struct\", \"isOperator\": false, \"conditions\": [], \"rowType\": \"addable\",\"maxCondCount\":1}",
  onzClass = "{\"attrID\":\"onzClass\",\"attrName\":\"ONZ class\",\"attrType\":\"struct\",\"isOperator\":false,\"conditions\":[{\"value\":\"any\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}"
}
