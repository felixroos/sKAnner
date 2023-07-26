import open from "open";
import http from "http";

const PORT = process.env.PORT || 4321;

const codes = {
  3183940211242: () => {
    console.log("putzmittel gescannt!");
    /* open(
      "https://strudel.tidalcycles.org/#Ly8gIm1hbGxldCBzYWxhZCIgQGJ5IGZyb29zCgphd2FpdCBzYW1wbGVzKCdnaXRodWI6dGlkYWxjeWNsZXMvRGlydC1TYW1wbGVzL21hc3RlcicpCgpzZXRjcG0oMTIwLzQpCgpsZXQgY2hvcmRzID0gYDwKQ205ITQKRm0xMSE0CkJeNyMxMSE0CkVeNyMxMSEyIEFeNyMxMSEyCj5gCgpzdGFjaygKICBzdGFjaygKICAvLyBjaG9yZHMKICBjaG9yZChjaG9yZHMpCiAgLnNldC5vdXQobigiPDAgMSAyIDwzIDQ%2BPio2IikuYWRkKCI8MCAxPiIpKQogIC5qdXgocmV2KQogIC5jbGlwKDEpLmRzKCIuMTI6MCIpLmRlbGF5KCIuNTouMTI1Oi44IikKICAuZGljdCgiaXJlYWwtZXh0IikKICAuYW5jaG9yKCJDNSIpCiAgLnNvbWV0aW1lcyh4PT54Lm9mZnNldCgxKSkKICAudm9pY2luZygpCiAgLnMoImdtX2VwaWFubzE6MyIpCiAgLnJlbGVhc2UoLjIpCiAgLmdhaW4oLjYpCiAgLnJvb20oLjgpLmNvbG9yKCdjeWFuJykKICAvLy5zdHJ1Y3QoIjx4ITMgeCgzLDgpPiIpCiAgLAogIG4oIjw4IDcgMyBbNCA1XSA2PioyIi5hZGQoIjwzIDQ%2BLzgiKSkKICAuY2hvcmQoY2hvcmRzKQogIC5kaWN0KCdpcmVhbCcpCiAgLnZvaWNpbmcoKQogIC5zKCJzYXd0b290aCxzcXVhcmUiKQogIC5qdXgocmV2KQogIC5hZGQobm90ZSgiMCwuMSIpKQogIC5kcygiLjE6MCIpLnBseSg2KQogIC5nYWluKHNhdykucm9vbSguNSkKICAubHBmKDQwMCkubHBxKDQpCiAgLmNvbG9yKCdtYWdlbnRhJykKICAubWFzaygiPDAhMiAxITMyPiIpCiAgLAogICAgCiAgLy8gYmFzcwogIGNob3JkKGNob3JkcykKICAucm9vdE5vdGVzKCIxLDIiKQogIC5zdHJ1Y3QoIngqMiIpCiAgLnMoImdtX2Fjb3VzdGljX2Jhc3MiKQogIC5nYWluKDEpCiAgLmNvbG9yKCd5ZWxsb3cnKQogIC5tYXNrKCI8MCE0IDEhMzI%2BIikKICApCiAgLmFkZChub3RlKHBlcmxpbi5yYW5nZSgwLC4zKSkpCiAgLAoKICAvLyBkcnVtcwogIG4oIlsxOSBbfkAxLjkgMTldXSoyLFt%2BIDRdKjIgLH5AMyA8fkAzIFsyQDEuOSAyXT4iKQogIC5zKCdncmV0c2NoJykKICAuZ2FpbigiWy45IC42XSozIikuc3BlZWQoLjUpLnNsb3coMikucm9vbSgxLjUpCiAgLnJhcmVseSh4PT54Lm11bChzcGVlZCgiMSwyIikpKQogIC5vZmYoMS84LCB4PT54LmhwZigxMDAwKS5kZWdyYWRlKCkuc3BlZWQoIi0yIikpCiAgLmNvbG9yKCd3aGl0ZScpLm1hc2soIjwxITMyIDAhOD4iKQogIAopCi8vLnB1bmNoY2FyZCh7Zm9sZDoxfSk%3D"
    ); */
  },
};

const requestHandler = (req, res) => {
  const code = req.url.split("?").slice(-1)[0];
  if (!code) {
    console.log("request without code.. am I a joke to you?");
    return;
  }
  const action = codes[code];
  if (!action) {
    console.log(
      `code "${code}" is unknown.. just pretending nothing happened...`
    );
    return;
  }

  console.log(`running code "${code}"`);
  action();
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("done");
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  console.log(
    `this is the official

  $$\\                         $$\\                           $$\\                
  $$ |                        $$ |                          $$ |               
$$$$$$\\    $$$$$$\\   $$$$$$\\  $$ | $$$$$$\\   $$$$$$\\        $$ |  $$\\ $$$$$$\\  
\\_$$  _|  $$  __$$\\ $$  __$$\\ $$ | \\____$$\\ $$  __$$\\       $$ | $$  |\\____$$\\ 
  $$ |    $$ /  $$ |$$ /  $$ |$$ | $$$$$$$ |$$ /  $$ |      $$$$$$  / $$$$$$$ |
  $$ |$$\\ $$ |  $$ |$$ |  $$ |$$ |$$  __$$ |$$ |  $$ |      $$  _$$< $$  __$$ |
  \\$$$$  |\\$$$$$$  |$$$$$$$  |$$ |\\$$$$$$$ |$$$$$$$  |      $$ | \\$$\\\\$$$$$$$ |
   \\____/  \\______/ $$  ____/ \\__| \\_______|$$  ____/       \\__|  \\__|\\_______|
                    $$ |                    $$ |                               
                    $$ |                    $$ |                               
                    \\__|                    \\__|
                                                
                   |_   _. ._ _  _   _|  _    ._ _   _  _  o     _  ._ 
                   |_) (_| | (_ (_) (_| (/_   | (/_ (_ (/_ | \/ (/_ |

       I am listening on port "${PORT}". Please send me something nice!!!!!!!!


  `
  );
});
