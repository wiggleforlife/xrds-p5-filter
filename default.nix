{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.python3
  ];

  shellHook = ''
	ln -s ${pkgs.python3} ./python3
  '';	
}
