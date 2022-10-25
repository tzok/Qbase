using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RNAqbase.Models.Search;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RNAqbase.BackEnd
{
    public class JsonFilterConverter : JsonCreationConverter<Filter>
    {
        protected override Filter Create(Type objectType, JObject jObject)
        {
            switch (jObject["Attribute"].ToString())
            {
                case "Experimental Method":
                    return new ExperimentalMethodFilter();
                case "ONZ class":
                    return new ONZFilter();
                case "PDB ID":
                    return new PDBIDFilter();
                case "Number of tetrads":
                    return new NoTetradsFilter();
                case "Type (by no. of strands)":
                    return new TypeFilter();
                case "Molecule Type":
                    return new MoleculeTypeFilter();
                case "PDB Deposition":
                    return new PDBDepositionFilter();
                default:
                    return null;
            }
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
        }
    }

    public abstract class JsonCreationConverter<T> : JsonConverter
    {
        protected abstract T Create(Type objectType, JObject jObject);

        public override bool CanConvert(Type objectType)
        {
            return typeof(T).IsAssignableFrom(objectType);
        }
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            JObject jObject = JObject.Load(reader);
            T target = Create(objectType, jObject);
            serializer.Populate(jObject.CreateReader(), target);
            return target;
        }
    }
}
