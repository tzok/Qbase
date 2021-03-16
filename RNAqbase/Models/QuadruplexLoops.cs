using System.Globalization;

namespace RNAqbase.Models
{
    public class QuadruplexLoops : BaseEntity
    {
        public string Id { get; set; }
        public string Short_sequence { get; set; }
        public string Full_sequence { get; set; }
        public string Loop_type { get; set; }
        public int Loop_length { get; set; }
    }
}