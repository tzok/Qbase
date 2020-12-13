namespace RNAqbase.Models
{
    public class HomePagePlot
    {
        public int HelixCount { get; set; }
        public int TetradCount { get; set; }
        public int QuadruplexCount { get; set; }
        public int AddedHelixCount { get; set; }
        public int AddedTetradCount { get; set; }
        public int AddedQuadruplexCount { get; set; }
        public string PdbRelease { get; set; }
    }
}