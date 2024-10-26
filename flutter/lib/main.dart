import 'package:flutter/material.dart';

void main() {
  runApp(Teste());
}

class Teste extends StatelessWidget {
  Teste({super.key});

  final TextEditingController _usernameField = TextEditingController();
  final TextEditingController _passwordField = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        home: Scaffold(
            appBar: AppBar(
              title: const Text('Tela de Login'),
            ),
            body: Padding(
              padding: const EdgeInsets.fromLTRB(250.0, 0.0, 250.0, 0.0),
              child: Column(
                children: [
                  Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 20.0),
                      child: TextField(
                          controller: _usernameField,
                          keyboardType: TextInputType.text,
                          style: const TextStyle(fontSize: 16.0),
                          decoration: const InputDecoration(
                              icon: Icon(Icons.account_circle),
                              labelText: 'Username',
                              hintText: 'Digite seu username'))),
                  Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 20.0),
                      child: TextField(
                          controller: _passwordField,
                          keyboardType: TextInputType.text,
                          style: const TextStyle(fontSize: 16.0),
                          decoration: const InputDecoration(
                              icon: Icon(Icons.lock_outline),
                              labelText: 'Password',
                              hintText: 'Digite sua password'))),
                  Padding(
                      padding: const EdgeInsets.fromLTRB(0.0, 20.0, 0.0, 0.0),
                      child: ElevatedButton(
                          onPressed: () {}, 
                          style: const ButtonStyle(
                            backgroundColor: WidgetStatePropertyAll(Colors.green),
                            foregroundColor: WidgetStatePropertyAll(Colors.white),
                            ),
                          child: const Text('Acessar'),
                          ))
                ],
              ),
            )));
  }
}
