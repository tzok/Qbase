export enum TableContent {
  authorName = "{\"attribute\":\"Author Name\",\"isOperator\":true,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  pdbID = "{\"attribute\":\"PDB ID\",\"isOperator\":false,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  keyword = "{\"attribute\":\"Keyword\",\"isOperator\":false,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":1}",
  expMethod = "{\"attribute\":\"Experimental Method\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"X-Ray\",\"operator\":\"\"},{\"condition\":\"NMR\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}",
  molType = "{\"attribute\":\"Molecule Type\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"DNA\",\"operator\":\"\"},{\"condition\":\"RNA\",\"operator\":\"\"},{\"condition\":\"other\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}",
  typeNoStrands = "{\"attribute\":\"Type (by no. of strands)\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"unimolecular\",\"operator\":\"\"},{\"condition\":\"bimolecular\",\"operator\":\"\"},{\"condition\":\"tetramolecular\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}",
  noOfTetrads = "{\"attribute\":\"Number of tetrads\",\"isOperator\":true,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  ions = "{\"attribute\":\"Ions\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"Na\",\"operator\":\"\"},{\"condition\":\"K\",\"operator\":\"\"},{\"condition\":\"Pt\",\"operator\":\"\"},{\"condition\":\"Tl\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}",
  webbaDaSilva = "{ \"attribute\": \"Webba da Silva\", \"isOperator\": false, \"conditions\": [], \"rowType\": \"addable\",\"maxCondCount\":1}",
  onzClass = "{\"attribute\":\"ONZ class\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"N-\",\"operator\":\"\"},{\"condition\":\"Z-\",\"operator\":\"\"},{\"condition\":\"O-\",\"operator\":\"\"}],\"rowType\":\"multiSelect\",\"maxCondCount\":0}",
  pdbDeposition = "{\"attribute\":\"PDB Deposition\",\"isOperator\":true,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":2}",
  gtractSeq = "{\"attribute\":\"G-tract sequence\",\"isOperator\":false,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":5}",
  bulges = "{\"attribute\":\"Bulges\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"with bulges\",\"operator\":\"\"},{\"condition\":\"without bulges\",\"operator\":\"\"}],\"rowType\":\"radioSelect\",\"maxCondCount\":0}",
  vLoops = "{\"attribute\":\"V-Loops\",\"isOperator\":false,\"conditions\":[{\"condition\":\"any\",\"operator\":\"\"},{\"condition\":\"with V-Loops\",\"operator\":\"\"},{\"condition\":\"without V-Loops\",\"operator\":\"\"}],\"rowType\":\"radioSelect\",\"maxCondCount\":0}",
  sequence = "{\"attribute\":\"Sequence\",\"isOperator\":true,\"conditions\":[],\"rowType\":\"addable\",\"maxCondCount\":1}"
}
