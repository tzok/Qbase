FROM mcr.microsoft.com/dotnet/core/sdk:2.2

RUN echo 'deb http://archive.debian.org/debian stretch-backports main contrib non-free' > /etc/apt/sources.list \
 && echo 'deb http://archive.debian.org/debian stretch main contrib non-free' >> /etc/apt/sources.list \
 && apt-get update -y \
 && apt-get install -t stretch-backports -y \
        nodejs \
        npm \
 && rm -r /var/lib/apt/lists/*

COPY RNAqbase /RNAqbase

WORKDIR /RNAqbase

RUN dotnet publish -c Release

CMD ["dotnet", "bin/Release/netcoreapp2.2/RNAqbase.dll"]

#ENV ASPNETCORE_ENVIRONMENT=Development
